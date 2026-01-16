import { Box } from "@mui/material";
import BoardContact from "../components/controlPages/contact/BoardContact";

const Contact = () => {
  return (
    <Box sx={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "green" }}>CONTACT</h1>
      <BoardContact />
    </Box>
  );
};

export default Contact;
