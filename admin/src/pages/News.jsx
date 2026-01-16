import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BoardPost from "../components/controlPages/post/BoardPost";

const News = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "green" }}>ACCOMMODATION</h1>
      <Button
        variant="contained"
        color="success"
        onClick={() => navigate(`create`)}
        sx={{ margin: "20px" }}
      >
        Create new post
      </Button>

      <BoardPost />
    </Box>
  );
};

export default News;
