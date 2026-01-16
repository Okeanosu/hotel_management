import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Button, IconButton, TextField } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import newRequest from "../../../utils/newRequest";
import toastService from "../../../utils/toastService";
import FoodDefault from "../../../assets/images/food-default.jpg";

const CreateFood = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [imgPreview, setImgPreview] = useState("");
  const [resImg, setResImg] = useState(null);
  const [nameFood, setNameFood] = useState("");

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
          folder: `foods`,
        });
        setResImg(res.data.image);
      } catch (err) {
        console.log(err);
      }
    };
  };

  // POST: Create new food
  const createFood = useMutation({
    mutationFn: (data) => {
      return newRequest.post(`/food/create`, data);
    },
    onSuccess: (res) => {
      toastService.success(res.data.message);
      queryClient.invalidateQueries(["foods"]);
      setImgPreview("");
      setResImg(null);
      fileInputRef.current.value = "";
    },
  });

  const clickCreate = () => {
    const data = {
      name: nameFood,
      image: resImg._id,
    };
    setNameFood("");
    createFood.mutate(data);
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
              src={imgPreview || FoodDefault}
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
              label="Name food"
              variant="outlined"
              value={nameFood}
              onChange={(e) => setNameFood(e.target.value)}
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

export default CreateFood;
