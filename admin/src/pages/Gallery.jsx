import { Box } from "@mui/material";
import CreateShowcase from "../components/controlPages/showcase/CreateShowcase";
import BoardShowcase from "../components/controlPages/showcase/BoardShowcase";

const Gallery = () => {
  return (
    <Box sx={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "green" }}>GALLERY</h1>
      <CreateShowcase />
      <BoardShowcase />
    </Box>
  );
};

export default Gallery;
