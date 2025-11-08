import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from 'axios'
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Name is required"),
  dob: Yup.string().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  emailAddress: Yup.string().email("Invalid email").required("Email is required"),
  occupation: Yup.string().required("Occupation is required"),
  addressLine1: Yup.string().required("Address Line 1 is required"),
  addressLine2: Yup.string(),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  district: Yup.string().required("District is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const styles = {
  container: {
    height: "100%",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    padding: "20px",
  },
  paper: {
    padding: "30px",
    width: "100%",
    maxWidth: "600px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: 600,
  },
  field: {
    marginBottom: "16px",
  },
};

const handleRegister = async (values, { setSubmitting, setFieldError }) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/ems/v1/register",
      values
    );
    console.log("Registered successfully:", response.data);
    alert('Registered successfully');

    //navigate("/dashboard");
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);

    alert('Register failed');

    // setFieldError("email", "Invalid credentials");
  } finally {
    setSubmitting(false);
  }
};


export function Register() {
  return (
    <Formik
      initialValues={{
        fullName: "",
        dob: "",
        gender: "",
        mobile: "",
        emailAddress: "",
        occupation: "",
        addressLine1: "",
        addressLine2: "",
        country: "",
        state: "",
        district: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
      //{(values) => {
      //   console.log("Submitted values:", values);
      // }}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Box style={styles.container}>
          <Paper style={styles.paper}>
            <Typography variant="h5" style={styles.title}>
              Register
            </Typography>
            <Form>
              <TextField
                fullWidth
                name="fullName"
                label="Name"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fullName && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
                style={styles.field}
              />

              <TextField
                fullWidth
                name="dob"
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dob && Boolean(errors.dob)}
                helperText={touched.dob && errors.dob}
                style={styles.field}
              />

              <FormControl
                fullWidth
                style={styles.field}
                error={touched.gender && Boolean(errors.gender)}
              >
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Gender"
                >
                  
                  <MenuItem value="1">Male</MenuItem>
                  <MenuItem value="2">Female</MenuItem>
                  
                </Select>
                {touched.gender && errors.gender && (
                  <Typography variant="caption" color="error">
                    {errors.gender}
                  </Typography>
                )}
              </FormControl>

              <TextField
                fullWidth
                name="mobile"
                label="Mobile"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.mobile && Boolean(errors.mobile)}
                helperText={touched.mobile && errors.mobile}
                style={styles.field}
              />

              <TextField
                fullWidth
                name="emailAddress"
                label="Email"
                value={values.emailAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                style={styles.field}
              />

              <FormControl
                fullWidth
                style={styles.field}
                error={touched.occupation && Boolean(errors.occupation)}
              >
                <InputLabel>Occupation</InputLabel>
                <Select
                  name="occupation"
                  value={values.occupation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Occupation"
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Employed">Employed</MenuItem>
                  <MenuItem value="Unemployed">Unemployed</MenuItem>
                </Select>
                {touched.occupation && errors.occupation && (
                  <Typography variant="caption" color="error">
                    {errors.occupation}
                  </Typography>
                )}
              </FormControl>

              <TextField
                fullWidth
                name="addressLine1"
                label="Address Line 1"
                value={values.addressLine1}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address1 && Boolean(errors.address1)}
                helperText={touched.address1 && errors.address1}
                style={styles.field}
              />

              <TextField
                fullWidth
                name="addressLine2"
                label="Address Line 2"
                value={values.addressLine2}
                onChange={handleChange}
                onBlur={handleBlur}
                style={styles.field}
              />

              <FormControl
                fullWidth
                style={styles.field}
                error={touched.country && Boolean(errors.country)}
              >
                <InputLabel>Country</InputLabel>
                <Select
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Country"
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                </Select>
                {touched.country && errors.country && (
                  <Typography variant="caption" color="error">
                    {errors.country}
                  </Typography>
                )}
              </FormControl>

              <FormControl
                fullWidth
                style={styles.field}
                error={touched.state && Boolean(errors.state)}
              >
                <InputLabel>State</InputLabel>
                <Select
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="State"
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                  <MenuItem value="Kerala">Kerala</MenuItem>
                  <MenuItem value="Karnataka">Karnataka</MenuItem>
                </Select>
                {touched.state && errors.state && (
                  <Typography variant="caption" color="error">
                    {errors.state}
                  </Typography>
                )}
              </FormControl>

              <FormControl
                fullWidth
                style={styles.field}
                error={touched.district && Boolean(errors.district)}
              >
                <InputLabel>District</InputLabel>
                <Select
                  name="district"
                  value={values.district}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="District"
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Thoothukudi">Thoothukudi</MenuItem>
                  <MenuItem value="Madurai">Madurai</MenuItem>
                  <MenuItem value="Chennai">Chennai</MenuItem>
                  <MenuItem value="Kochi">Kochi</MenuItem>
                </Select>
                
                {touched.district && errors.district && (
                  <Typography variant="caption" color="error">
                    {errors.district}
                  </Typography>
                )}
              </FormControl>

              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                style={styles.field}
              />

              <TextField
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                style={styles.field}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ marginTop: "16px" }}
              >
                Register
              </Button>
            </Form>
            <Typography variant="body2" align="center">
              Already Registered?{"  "}
              <Link to="/login" style={{ color: "blue" }}>
                Click to Login
              </Link>
            </Typography>
          </Paper>
        </Box>
      )}
    </Formik>
  );
}
