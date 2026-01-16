import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  Checkbox,
} from "@mui/material";

import noImg from "../../../assets/images/no-img.jpg";
import newRequest from "../../../utils/newRequest";
import toastService from "../../../utils/toastService";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter room name!"),
  notes: Yup.string().required("Please add notes!"),
  descriptions: Yup.string(),
  area: Yup.number()
    .required("Please enter room area!")
    .positive("Room area must be a positive number!"),
  high: Yup.number()
    .required("Please enter room height!")
    .positive("Room height must be a positive number!"),
  bedSize: Yup.string().required("Please choose bed size!"),
  price: Yup.number()
    .required("Please enter price!")
    .positive("Price must be a positive number!"),
});

const listEquipment = [
  "Work desk",
  "Tea-coffee",
  "Hair dryer",
  "Room service (surcharge)",
  "Free Buffet breakfast",
  "Security 24h",
  "Room phone",
  "Swimming pool",
  "Cable TV",
  "Kettle",
  "Minibar",
  "Cupboard clothes",
  "Modern bathroom equipment",
  "Free wifi - internet access",
];

const CreateRoom = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    notes: "",
    descriptions: "",
    area: "",
    high: "",
    bedSize: "",
    price: "",
    equipment: [],
    images: [],
  });

  // const [imgPreview, setImgPreview] = useState([]);

  const handleChangeEquipment = (e) => {
    const isChecked = e.target.checked;
    const equipmentValue = e.target.value;

    setFormData((prevFormData) => {
      if (isChecked) {
        return {
          ...prevFormData,
          equipment: [...prevFormData.equipment, equipmentValue],
        };
      } else {
        return {
          ...prevFormData,
          equipment: prevFormData.equipment.filter(
            (eq) => eq !== equipmentValue
          ),
        };
      }
    });
  };

  const handleImageChange = (e, index) => {
    e.preventDefault();
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      // setImgPreview((prevUrls) => {
      //   const updatedUrls = [...prevUrls];
      //   updatedUrls[index] = reader.result;
      //   return updatedUrls;
      // });
      try {
        const res = await newRequest.post(`image/create`, {
          file: reader.result,
          name: file.name,
          folder: `accommodation`,
        });
        toastService.success("Upload ảnh thành công!");
        setFormData((prevFormData) => {
          const updatedImage = [...prevFormData.images];
          updatedImage[index] = res.data.image;
          return {
            ...prevFormData,
            images: updatedImage,
          };
        });
      } catch (err) {
        console.log(err);
      }
    };
  };

  // POST: Create new room
  const createRoom = useMutation({
    mutationFn: (formData) => {
      return newRequest.post(`room/create`, formData);
    },
    onSuccess: (res) => {
      toastService.success(res.data.message);
      queryClient.invalidateQueries(["rooms"]);
      navigate(`/pages/accommodation`);
    },
  });

  const handleSubmit = (values) => {
    const newData = {
      ...formData,
      name: values.name,
      notes: values.notes,
      descriptions: values.descriptions,
      area: values.area,
      high: values.high,
      bedSize: values.bedSize,
      price: values.price,
    };
    createRoom.mutate(newData);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: 20 }}>Create new room</h1>

      <Box sx={{ maxWidth: "800px", margin: "50px auto" }}>
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <TextField
                name="name"
                label="Name Room"
                fullWidth
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ marginBottom: "16px" }}
              />
              <TextField
                name="notes"
                label="Notes"
                fullWidth
                multiline
                error={touched.notes && Boolean(errors.notes)}
                helperText={touched.notes && errors.notes}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ marginBottom: "16px" }}
              />
              <TextField
                name="descriptions"
                label="Descriptions"
                fullWidth
                multiline
                minRows={3}
                error={touched.descriptions && Boolean(errors.descriptions)}
                helperText={touched.descriptions && errors.descriptions}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ marginBottom: "16px" }}
              />
              <TextField
                name="area"
                label="Area (m2)"
                fullWidth
                type="number"
                error={touched.area && Boolean(errors.area)}
                helperText={touched.area && errors.area}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ marginBottom: "16px" }}
              />
              <TextField
                name="high"
                label="High (m)"
                fullWidth
                type="number"
                step={0.1}
                error={touched.high && Boolean(errors.high)}
                helperText={touched.high && errors.high}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ marginBottom: "16px" }}
              />

              <FormControl fullWidth>
                <InputLabel id="bed-size-label">BedSize (w*h)</InputLabel>
                <Select
                  name="bedSize"
                  labelId="bed-size-label"
                  label="BedSize (w*h)"
                  fullWidth
                  error={touched.bedSize && Boolean(errors.bedSize)}
                  helperText={touched.bedSize && errors.bedSize}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ marginBottom: "16px" }}
                >
                  <MenuItem value="1.8*2.0">1.8*2.0</MenuItem>
                  <MenuItem value="2.0*2.2">2.0*2.2</MenuItem>
                  <MenuItem value="2.0*3.0">2.0*3.0</MenuItem>
                </Select>
              </FormControl>

              <TextField
                name="price"
                label="Price (vnd)"
                fullWidth
                type="number"
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ marginBottom: "16px" }}
              />

              <FormLabel component="legend">Images: </FormLabel>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                {[0, 1, 2].map((index) => (
                  <Box key={index} fullWidth>
                    <Box
                      sx={{
                        width: "100%",
                        border: "1px solid gray",
                        borderRadius: "4px",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                      }}
                    >
                      <img
                        src={
                          formData.images[index]
                            ? formData.images[index].url
                            : noImg
                        }
                        alt={`preview-${index}`}
                        style={{
                          width: "250px",
                          height: "250px",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    {
                      <div style={{ color: "green", margin: "8px" }}>
                        {formData.images[index]
                          ? `Id: ${formData.images[index]._id}`
                          : `Id: null`}
                      </div>
                    }
                    <Button
                      variant="contained"
                      component="label"
                      fullWidth
                      style={{ marginBottom: "16px" }}
                    >
                      Chose Image
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(event) => handleImageChange(event, index)}
                      />
                    </Button>
                  </Box>
                ))}
              </Box>

              <FormControl
                component="TextFieldset"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                }}
              >
                <FormLabel component="legend">Equipment:</FormLabel>
                {listEquipment.map((equipment, index) => (
                  <FormControlLabel
                    key={index}
                    value={equipment}
                    label={equipment}
                    name="equipment"
                    control={
                      <Checkbox
                        checked={formData.equipment.includes(equipment)}
                        onChange={handleChangeEquipment}
                      />
                    }
                  />
                ))}
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ marginTop: "16px" }}
              >
                Create new room
              </Button>
            </Form>
          )}
        </Formik>
        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ marginTop: "16px" }}
          onClick={() => navigate(`/pages/accommodation`)}
        >
          Back
        </Button>
      </Box>
    </div>
  );
};

export default CreateRoom;
