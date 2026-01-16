import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import BoardRoom from "../components/controlPages/room/BoardRoom";

const Accommodation = () => {
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
        Create new room
      </Button>

      <BoardRoom />
    </Box>
  );
};

export default Accommodation;
