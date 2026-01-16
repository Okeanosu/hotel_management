import { Box } from "@mui/material";
import BoardFood from "../components/controlPages/food/BoardFood";
import CreateFood from "../components/controlPages/food/CreateFood";

const Menu = () => {
  return (
    <Box sx={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "green" }}>MENU</h1>
      <CreateFood />
      <BoardFood />
    </Box>
  );
};

export default Menu;
