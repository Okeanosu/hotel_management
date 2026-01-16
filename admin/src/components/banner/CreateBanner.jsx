import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Button, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import newRequest from "../../utils/newRequest";
import toastService from "../../utils/toastService";
import bannerDefault from "../../assets/images/banner-default.jpg";

const CreateBanner = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [imgPreview, setImgPreview] = useState("");
  const [resImg, setResImg] = useState(null);

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
          folder: `banner/${slug}`,
        });
        setResImg(res.data.image);
      } catch (err) {
        console.log(err);
      }
    };
  };

  // POST: Create new image banner
  const createBanner = useMutation({
    mutationFn: (image) => {
      return newRequest.post(`/banner/create?slug=${slug}`, image);
    },
    onSuccess: (res) => {
      toastService.success(res.data.message);
      queryClient.invalidateQueries(["banners"]);
      setImgPreview("");
      setResImg(null);
      fileInputRef.current.value = "";
      navigate(`banners`);
    },
  });

  const clickCreate = () => {
    createBanner.mutate(resImg);
  };

  return (
    <Box sx={{ maxWidth: "1000px", margin: "auto" }}>
      <Box sx={{ margin: "20px 0" }}>
        <img
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
          src={imgPreview || bannerDefault}
          alt="Image Preview"
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box>
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
            variant="contained"
            color="success"
            sx={{ maxWidth: "200px" }}
            onClick={clickCreate}
          >
            Create
          </Button>
        ) : (
          <Button variant="contained" disabled sx={{ maxWidth: "200px" }}>
            Create
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CreateBanner;
