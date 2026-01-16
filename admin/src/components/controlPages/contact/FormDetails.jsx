import { Box, TextField } from "@mui/material";

const FormDetails = (props) => {
  return (
    <Box sx={{ padding: "50px 30px" }}>
      <TextField
        label="Name"
        value={props.name}
        fullWidth
        readOnly
        style={{ marginBottom: "16px" }}
      />
      <TextField
        label="Email"
        value={props.email}
        fullWidth
        readOnly
        style={{ marginBottom: "16px" }}
      />
      <TextField
        label="Phone"
        value={props.phone}
        fullWidth
        readOnly
        style={{ marginBottom: "16px" }}
      />
      <TextField
        label="Address"
        value={props.address}
        fullWidth
        readOnly
        style={{ marginBottom: "16px" }}
      />
      <TextField
        label="Title"
        value={props.title}
        fullWidth
        readOnly
        style={{ marginBottom: "16px" }}
      />
      <TextField
        label="Content"
        value={props.content}
        fullWidth
        readOnly
        multiline
        rows={4}
        style={{ marginBottom: "16px" }}
      />
    </Box>
  );
};

export default FormDetails;
