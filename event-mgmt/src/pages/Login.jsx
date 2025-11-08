import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Box, Button, TextField, Typography, Paper, AppBar,Toolbar } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Login() {

const {login}=useAuth()

  const validationSchema = Yup.object({
    emailAddress: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/ems/v1/login",
        values
      );
      console.log("Login success:", response);
      if(response.status ===200){
        const{jwt}=response.data
        //localStorage.setItem("jwt",jwt)
        login(jwt)
        navigate("/dashboard");
      }else{
        alert("Invalid Email or password")
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      alert("failed to login");

      // setFieldError("email", "Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  const styles = {
    
    container: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f3f3f3",
    },
    paper: {
      padding: "30px",
      width: "350px",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      fontWeight: 600,
    },
    button: {
      marginTop: "16px",
      padding: "10px",
      fontSize: "16px",
      backgroundColor: "#1976d2",
      color: "white",
    },
  };

  const navigate = useNavigate();
  return (
    <>
    {/* <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div">
            Event Management System
          </Typography>
        </Toolbar>
      </AppBar> */}
    <Formik
    
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleLogin} // => //{}
      //console.log("Submitted values:", values);
      //}}
    >
      {({ handleChange, handleBlur, values, errors, touched }) => (
        
        <Box style={styles.container}>
          <Paper elevation={3} style={styles.paper}>
            <Typography variant="h5" style={styles.title}>
              Login
            </Typography>

            <Form>
              <TextField
                fullWidth
                label="Email"
                name="emailAddress"
                type="email"
                value={values.emailAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                style={{ marginBottom: "16px" }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                style={{ marginBottom: "8px" }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={styles.button}
              >
                Login
              </Button>
            </Form>
            <Typography variant="body2" align="center">
              Don't have an account?{"  "}
              <Link to="/register" style={{ color: "blue" }}>
                Click to Register
              </Link>
            </Typography>
          </Paper>
        </Box>
       
      )}
    </Formik>
    </>
  );
}
