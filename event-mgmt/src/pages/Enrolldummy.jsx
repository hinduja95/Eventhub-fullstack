import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EnrollSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  emailAddress: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  mobileNo: Yup.string().matches(
    /^[0-9]{10}$/,
    "Enter a valid 10-digit mobile number"
  ),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  district: Yup.string().required("District is required"),
});

const Enroll = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const data = {
        enrollId: Date.now(),
        eventId: id,
        fullName: values.fullName,
        emailAddress: values.emailAddress,
        mobileNo: values.mobileNo,
        country: values.country,
        state: values.state,
        district: values.district,
        status: 1,
        meta1: values.meta1 || null,
        meta2: values.meta2 || null,
        meta3: values.meta3 || null,
        createdBy: "",
        createdAt: new Date(),
        updatedBy: "",
        updatedAt: new Date(),
      };

      const res = await axios.post(
        "http://localhost:8080/ems/v1/event/enroll",
        data
      );
      alert("Sucessfully Enrolled");
      console.log("data",res.data)
      resetForm();
     // navigate("/viewevents");
    } catch (err) {
      console.error("Enroll error:", err);
      alert("Error enrolling. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        p: 2,
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Card sx={{ width: "90%", maxWidth: 800, p: 3,justifyContent:'center'
       }}>
        <CardHeader
          title="Event Enrollment"
          sx={{
            backgroundColor: "#0097A7",
            color: "white",
            textAlign: "center",
          }}
        />
        <CardContent>
          <Formik
            Values={{
              fullName: "",
              emailAddress: "",
              mobileNo: "",
              country: "",
              state: "",
              district: "",
              meta1: "",
              meta2: "",
              meta3: "",
            }}
            validationSchema={EnrollSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Grid container spacing={3}  justifyContent="center">
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="fullName"
                      label="Full Name"
                      fullWidth
                      error={touched.fullName && Boolean(errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="emailAddress"
                      label="Email Address"
                      fullWidth
                      error={
                        touched.emailAddress && Boolean(errors.emailAddress)
                      }
                      helperText={touched.emailAddress && errors.emailAddress}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="mobileNo"
                      label="Mobile Number"
                      fullWidth
                      error={touched.mobileNo && Boolean(errors.mobileNo)}
                      helperText={touched.mobileNo && errors.mobileNo}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="country"
                      label="Country"
                      fullWidth
                      error={touched.country && Boolean(errors.country)}
                      helperText={touched.country && errors.country}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="state"
                      label="State"
                      fullWidth
                      error={touched.state && Boolean(errors.state)}
                      helperText={touched.state && errors.state}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="district"
                      label="District"
                      fullWidth
                      error={touched.district && Boolean(errors.district)}
                      helperText={touched.district && errors.district}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Field
                      as={TextField}
                      name="meta1"
                      label="Meta 1"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      as={TextField}
                      name="meta2"
                      label="Meta 2"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      as={TextField}
                      name="meta3"
                      label="Meta 3"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="center" mt={3}>
                      <Button type="submit" variant="contained" size="large">
                        Enroll
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Enroll;
