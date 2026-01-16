import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Button, IconButton, TextField } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import newRequest from "../../../utils/newRequest";
import toastService from "../../../utils/toastService";
import noImg from "../../../assets/images/no-img.jpg";

const CreateShowcase = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [imgPreview, setImgPreview] = useState("");
  const [resImg, setResImg] = useState(null);
  const [nameShowcase, setNameShowcase] = useState("");

  // Choose photo
  const handleImageChange = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setImgPreview(reader.result);
      try {
        const res = await newRequest.post(`image/create`, {
          file: reader.result,
          name: file.name,
          folder: `showcase`,
        });
        setResImg(res.data.image);
      } catch (err) {
        console.log(err);
      }
    };
  };

  // POST: Create new Showcase
  const createShowcase = useMutation({
    mutationFn: (data) => {
      return newRequest.post(`/showcase/create`, data);
    },
    onSuccess: (res) => {
      toastService.success(res.data.message);
      queryClient.invalidateQueries(["showcases"]);
      setImgPreview("");
      setResImg(null);
      fileInputRef.current.value = "";
    },
  });

  const clickCreate = () => {
    const data = {
      name: nameShowcase,
      image: resImg._id,
    };
    setNameShowcase("");
    createShowcase.mutate(data);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", margin: "20px 0" }}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <Box
            sx={{
              height: "300px",
              width: "300px",
              border: "1px solid #a3a3a3",
            }}
          >
            <img
              src={imgPreview || noImg}
              alt="Image Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: "10px",
            }}
          >
            <TextField
              label="Name Showcase"
              variant="outlined"
              value={nameShowcase}
              onChange={(e) => setNameShowcase(e.target.value)}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              Chọn ảnh:
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <PhotoCamera />
              </IconButton>
            </Box>
            <Box>Name file: {resImg && resImg.name}</Box>
            <Box>Folder: {resImg && resImg.folder}</Box>
            <Box>Public id: {resImg && resImg.publicId}</Box>
            <Box>
              Url:
              <a href={resImg && resImg.url} target="_blank">
                {resImg && resImg.url}{" "}
              </a>
            </Box>
            {resImg ? (
              <Button
                className="btn-create"
                variant="contained"
                color="success"
                onClick={clickCreate}
              >
                Create
              </Button>
            ) : (
              <Button className="btn-create" variant="contained" disabled>
                Create
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateShowcase;
