import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  FormLabel,
  InputLabel,
  TextField,
  Button,
  LinearProgress,
} from "@mui/material";

import noImg from "../../../assets/images/no-img.jpg";
import newRequest from "../../../utils/newRequest";
import toastService from "../../../utils/toastService";
import DoubleTodoList from "../../DoubleTodoList";
import MonoTodoList from "../../MonoTodoList";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter room name!"),
  tourCode: Yup.string().required("Please add tour code!"),
});

const UpdateTour = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    tourCode: "",
    images: [],
  });

  const [schedules, setSchedules] = useState([]);
  const [tourPrice, setTourPrice] = useState([]);

  const [inclusions, setInclusions] = useState([]);
  const [exclusions, setExclusions] = useState([]);

  // GET: get tour update
  const { isLoading, error } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => newRequest.get(`tour/${id}`),
    onSuccess: (res) => {
      setFormData(res.data);
      setSchedules(res.data.tripSchedules);
      setTourPrice(res.data.tourPrice);
      setInclusions(res.data.inclusions);
      setExclusions(res.data.exclusions);
    },
  });

  const handleImageChange = (e, index) => {
    e.preventDefault();
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
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

  // PUT: Update tour
  const updateTour = useMutation({
    mutationFn: (formData) => {
      return newRequest.put(`tour/update/${id}`, formData);
    },
    onSuccess: (res) => {
      toastService.success(res.data.message);
      queryClient.invalidateQueries(["tours"]);
      navigate(`/pages/tour-travel`);
    },
  });

  const handleSubmit = (values) => {
    const newData = {
      ...formData,
      name: values.name,
      tourCode: values.tourCode,
      tripSchedules: schedules,
      inclusions,
      exclusions,
      tourPrice,
    };
    updateTour.mutate(newData);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: 20 }}>Update tour</h1>
      {isLoading ? (
        <LinearProgress />
      ) : error ? (
        <>Error</>
      ) : (
        <Box sx={{ maxWidth: "800px", margin: "50px auto" }}>
          <InputLabel id="" style={{ marginBottom: "16px" }}>
            Object id: {formData._id}
          </InputLabel>
          <Formik
            enableReinitialize
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <TextField
                  name="name"
                  label="Name tour"
                  fullWidth
                  value={values.name}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ marginBottom: "16px" }}
                />
                <TextField
                  name="tourCode"
                  label="Tour code"
                  fullWidth
                  multiline
                  value={values.tourCode}
                  error={touched.notes && Boolean(errors.notes)}
                  helperText={touched.notes && errors.notes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ marginBottom: "16px" }}
                />

                <DoubleTodoList
                  nameKey="time"
                  nameValue="content"
                  tasks={schedules}
                  setTasks={setSchedules}
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
                    <Box key={index}>
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

                <MonoTodoList
                  label="inclusions"
                  tasks={inclusions}
                  setTasks={setInclusions}
                />
                <MonoTodoList
                  label="exclusions"
                  tasks={exclusions}
                  setTasks={setExclusions}
                />

                <DoubleTodoList
                  nameKey="numberPerson"
                  nameValue="pricePerPerson"
                  tasks={tourPrice}
                  setTasks={setTourPrice}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ marginTop: "16px" }}
                >
                  Update tour
                </Button>
              </Form>
            )}
          </Formik>
          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{ marginTop: "16px" }}
            onClick={() => navigate(`/pages/tour-travel`)}
          >
            Back
          </Button>
        </Box>
      )}
    </div>
  );
};

export default UpdateTour;
