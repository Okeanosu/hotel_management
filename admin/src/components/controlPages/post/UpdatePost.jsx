import React, { useState, useRef, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import {
  Box,
  TextField,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
} from "@mui/material";

import { Preview, Send } from "@mui/icons-material";
import "react-quill/dist/quill.snow.css";

Quill.register("modules/imageUploader", ImageUploader);

import newRequest from "../../../utils/newRequest";
import toastService from "../../../utils/toastService";

const UpdatePost = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const reactQuillRef = useRef();
  const [data, setData] = useState({
    title: "",
    content: "",
    text: "",
    images: [],
  });
  const [title, setTitle] = useState("");
  const [text, setText] = useState();
  const [content, setContent] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // GET: Get post update
  const { isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => newRequest.get(`post/${id}`),
    onSuccess: (res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
      setData({
        text: res.data.text,
        images: res.data.images,
      });
    },
  });

  // PUT: Update a new Post
  const updatePost = useMutation({
    mutationFn: (formData) => {
      return newRequest.put(`post/update/${id}`, formData);
    },
    onSuccess: (res) => {
      toastService.success(res.data.message);
      queryClient.invalidateQueries(["posts"]);
      navigate(`/pages/news`);
    },
  });

  const clickSend = () => {
    // console.log(data);
    updatePost.mutate(data);
  };

  const clickPreview = () => {
    setIsPreviewOpen(true);
  };

  useEffect(() => {
    setText(`<h1 class="ql-align-center">${title}</h1>${content}`);
    setData({
      ...data,
      title,
      content,
    });
  }, [title, content]);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "align",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],

      imageUploader: {
        upload: (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
              try {
                const res = await newRequest
                  .post(`image/create`, {
                    file: reader.result,
                    name: file.name,
                    folder: `posts`,
                  })
                  .then((res) => {
                    setData((prevData) => ({
                      ...prevData,
                      images: [...prevData.images, res.data.image._id],
                    }));

                    toastService.success("Tải ảnh thành công!");
                    resolve(res.data.image.url);
                  });
              } catch (err) {
                reject("Upload failed");
                console.log(err);
              }
            };
          });
        },
      },
    }),
    []
  );

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Update Post</h1>
      {isLoading ? (
        <LinearProgress />
      ) : error ? (
        <></>
      ) : (
        <Box sx={{ padding: "50px" }}>
          <Dialog
            open={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            PaperProps={{
              sx: {
                width: "100%",
                maxWidth: "1080px!important",
              },
            }}
          >
            <DialogTitle>Preview</DialogTitle>
            <DialogContent>
              <ReactQuill value={text} readOnly={true} theme="bubble" />
            </DialogContent>
          </Dialog>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: "16px" }}
          />

          <ReactQuill
            theme="snow"
            placeholder="Write something ..."
            value={content}
            formats={formats}
            onChange={(html) => setContent(html)}
            modules={modules}
            ref={reactQuillRef}
          />

          <Box>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: "fixed", bottom: 50, right: 30 }}
              icon={<SpeedDialIcon />}
            >
              <SpeedDialAction
                icon={<Preview />}
                tooltipTitle="Preview"
                onClick={clickPreview}
              />
              <SpeedDialAction
                icon={<Send />}
                tooltipTitle="Send"
                onClick={clickSend}
              />
            </SpeedDial>
          </Box>
        </Box>
      )}
    </>
  );
};

export default UpdatePost;
