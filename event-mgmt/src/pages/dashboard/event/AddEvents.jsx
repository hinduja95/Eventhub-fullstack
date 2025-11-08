import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Stack,
} from "@mui/material";

const validationSchema = Yup.object({
  eventName: Yup.string().required("Event Name is required"),
  eventDescription: Yup.string().required("Description is required"),
  eventDate: Yup.string().required("Event Date is required"),
  eventLocation: Yup.string().required("Location is required"),
  // eventLink: Yup.string().url(),
  // eventVideoLink: Yup.string().url(),
  // eventImageLink: Yup.string().url(),
  publishFrom: Yup.string().required("Publish From is required"),
  publishTo: Yup.string().required("Publish To is required"),
});

const handleAddevent = async (values, { setSubmitting, resetForm }) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/ems/v1/event/add",
      values
    );
    alert("Event added successfully!");
    resetForm();
  } catch (error) {
    console.error(error);
    alert("Failed to add event.");
  } finally {
    setSubmitting(false);
  }
};

export function AddEvents() {
  return (
    <Formik
      initialValues={{
        eventName: "",
        eventDescription: "",
        eventDate: "",
        eventLocation: "",
        eventLink: "",
        eventVideoLink: "",
        eventImageLink: "",
        publishFrom: "",
        publishTo: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleAddevent}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Box
          sx={{
            minHeight: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#f3f3f3",
            p: 2,
          }}
        >
          <Card
            sx={{ height: "70%", width: "60%", maxWidth: 750, boxShadow: 4, padding:2 }}
          >
            <CardHeader title="Add Event" sx={{ textAlign: "center" }} />
            <CardContent>
              <Form>
                <Grid container spacing={3} >
                  <Grid item xs={6} sm={3} size={4}>
                    <Stack container  direction="row" spacing={4} >
                    <TextField
                      fullWidth
                      name="eventName"
                      label="Event Name"
                      value={values.eventName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.eventName && Boolean(errors.eventName)}
                      helperText={touched.eventName && errors.eventName}
                    />
                   </Stack>
                  </Grid>

                  <Grid item xs={6} sm={3} size={4}>
                  <Stack direction="row " spacing={{ xs: 1, sm: 2, md: 4 }}>
                    <TextField
                      fullWidth
                      name="eventDescription"
                      label="Event Description"
                      value={values.eventDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.eventDescription &&
                        Boolean(errors.eventDescription)
                      }
                      helperText={
                        touched.eventDescription && errors.eventDescription
                      }
                    />
                   </Stack>
                  </Grid>

                  <Grid item xs={6} sm={3} md={4} size={4}>
                   <Stack direction="row " spacing={{ xs: 1, sm: 2, md: 4 }}>
                    <TextField
                      fullWidth
                      name="eventDate"
                      label="Event Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={values.eventDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.eventDate && Boolean(errors.eventDate)}
                      helperText={touched.eventDate && errors.eventDate}
                    />
                     </Stack>
                  </Grid>
             
                  <Grid item xs={6} sm={3} md={4} size={4}>
                    <Stack direction="row " spacing={{ xs: 1, sm: 2, md: 4 }}>
                    <TextField
                      fullWidth
                      name="eventLocation"
                      label="Event Location"
                      value={values.eventLocation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.eventLocation && Boolean(errors.eventLocation)
                      }
                      helperText={touched.eventLocation && errors.eventLocation}
                    />
                  </Stack>
                  </Grid>

                  <Grid item xs={6} sm={3} md={4} size={4}>
                    <Stack direction="row " spacing={{ xs: 1, sm: 2, md: 4 }}>
                    <TextField
                      fullWidth
                      name="eventLink"
                      label="Event Link"
                      value={values.eventLink}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.eventLink && Boolean(errors.eventLink)}
                      helperText={touched.eventLink && errors.eventLink}
                    />
                    </Stack>
                  </Grid>

                  <Grid item xs={6} sm={3} md={4} size={4}>
                    <Stack direction="row " spacing={{ xs: 1, sm: 2, md: 4 }}>
                    <TextField
                      fullWidth
                      name="eventVideoLink"
                      label="Event Video Link"
                      value={values.eventVideoLink}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.eventVideoLink && Boolean(errors.eventVideoLink)
                      }
                      helperText={
                        touched.eventVideoLink && errors.eventVideoLink
                      }
                    />
                    </Stack>
                  </Grid>

                  <Grid item xs={6} sm={3} md={4} size={4}>
                    <Stack direction="row " spacing={{ xs: 1, sm: 2, md: 4 }}>
                    <TextField
                      fullWidth
                      name="eventImageLink"
                      label="Event Image Link"
                      value={values.eventImageLink}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.eventImageLink && Boolean(errors.eventImageLink)
                      }
                      helperText={
                        touched.eventImageLink && errors.eventImageLink
                      }
                    />
                    </Stack>
                  </Grid>

                  <Grid item xs={9} sm={6} md={4} size={4}>
                    <Stack direction="row " spacing={{ xs: 1, sm: 2, md: 4 }}>
                    <TextField
                      fullWidth
                      name="publishFrom"
                      label="Publish From"
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      value={values.publishFrom}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.publishFrom && Boolean(errors.publishFrom)}
                      helperText={touched.publishFrom && errors.publishFrom}
                    />
                    </Stack>
                  </Grid>

                  <Grid item xs={6} sm={3} md={4} size={4}>
                    <Stack direction="row "  spacing={{ xs: 1, sm: 2, md: 4 }}>
                    <TextField
                      fullWidth
                      name="publishTo"
                      label="Publish To"
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      value={values.publishTo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.publishTo && Boolean(errors.publishTo)}
                      helperText={touched.publishTo && errors.publishTo}
                    />
                    </Stack>
                  </Grid>
                </Grid>

                <Stack direction="row" justifyContent="center" mt={3}>
                  <Button type="submit" variant="contained" size="large">
                    Submit
                  </Button>
                </Stack>
              </Form>
            </CardContent>
          </Card>
        </Box>
      )}
    </Formik>
  );
}
