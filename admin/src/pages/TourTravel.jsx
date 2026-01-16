import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";
import TourTable from "../components/controlPages/tour/BoardTour";

const TourTravel = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "green" }}>TOUR TRAVEL</h1>
      <Button
        className="btn-create"
        variant="contained"
        color="success"
        onClick={() => navigate(`create`)}
        sx={{ margin: "20px" }}
      >
        Create new tour
      </Button>

      <TourTable />
    </Box>
  );
};

export default TourTravel;
