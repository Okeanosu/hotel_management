import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import { Formik, Form } from "formik";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import newRequest from "../utils/newRequest";
import toastService from "../utils/toastService";

const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();

  const formData = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    setError("");
    try {
      await newRequest.post(`auth/login`, values).then((res) => {
        signIn({
          token: res.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { username: values.username },
        });
        toastService.success("Đăng nhập thành công!");
        navigate("/");
      });
    } catch (err) {
      setError("Username or password wrong!");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Formik initialValues={formData} onSubmit={handleSubmit}>
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "400px",
                bgcolor: "#fff",
                p: "40px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "20px",
                  width: "100%",
                }}
              >
                <TextField
                  type="text"
                  id="username"
                  label="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Username"
                  variant="outlined"
                  margin="dense"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "20px",
                  width: "100%",
                }}
              >
                <TextField
                  type={showPassword ? "text" : "password"}
                  id="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  variant="outlined"
                  margin="dense"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              {error && <Box>{error}</Box>}
              <Button type="submit" variant="contained" color="primary">
                Đăng nhập
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
