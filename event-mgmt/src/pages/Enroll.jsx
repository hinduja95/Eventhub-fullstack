import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";


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


export default function Enroll() {
  const navigate = useNavigate();
  const { id,name } = useParams();
  console.log("eventId", id);
  const { user } = useAuth();
  console.log("user", user);
  const [enrolldata, setEnroll] = useState({});
  const [userdata, setUser] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      await getEnrollData();
    };


    fetchData();
  }, []);


  const getUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/ems/v1/getuser/${user.data.userId}`  //'/getuser/:primaryId'
      );
      console.log("user data", res.data);
      setUser(res.data);
    } catch (err) {
      console.log("err in getting user information", err);
    }
  };


  const getEnrollData = async () => {
    try {
      const res = await axios.get(                                           //${user.data.email}        
        `http://localhost:8080/ems/v1/event/${id}/enroll`  ///event/:eventId/enroll'
      );
      console.log("res", res.data);
      setEnroll(res.data.data);
    } catch (err) {
      console.log("err in getting enrolled data", err);
    }
  };


  const validationSchema = Yup.object({
    status: Yup.number().required("Email is required"),
  });


  console.log("enrolleddata", enrolldata);
  return (
    <Box style={styles.container}>
      <Paper elevation={3} style={styles.paper}>
        <Typography variant="h5" style={styles.title}>
          Enroll for {name}
        </Typography>
        <Formik
          initialValues={{
            id: enrolldata.id || "",
            eventId: id || userdata.eventId,
            fullName: enrolldata.fullName || userdata.fullName,
            emailAddress: enrolldata.emailAddress || user.data.email,
            mobile: enrolldata.mobile || userdata.mobile,
            country: enrolldata.country || userdata.country,
            state: enrolldata.state || userdata.state,
            district: enrolldata.district || userdata.district,
            status: enrolldata.status || 0,
            meta1: enrolldata.meta1 || "",
            meta2: enrolldata.meta2 || "",
            meta3: enrolldata.meta3 || "",
            createdBy: user.data.email,
            updatedBy: user.data.email,
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          
          onSubmit={async (values) => {
  console.log("Submitted values:", values);
  try {
    // Attempt to POST new enrollment
    console.log("Trying to create new enrollment");
    const result = await axios.post(
      `http://localhost:8080/ems/v1/event/${id}/enroll`,
      values
    );

    console.log("New enrollment created:", result.data);
    alert("Enrollment submitted successfully");
  } catch (err) {
    if (err.response && err.response.status === 409) {
      // Already enrolled — fall back to updating
      console.log("Enrollment exists, switching to update");
      const existingEnroll = err.response.data.data;

      const updateResult = await axios.put(
        `http://localhost:8080/ems/v1/event/${id}/enroll/${existingEnroll.id}`,
        values
      );

      console.log("Existing enrollment updated:", updateResult.data);
      alert("Enrollment updated successfully");
    } else {
      console.error("Unexpected error:", err);
      alert("Something went wrong. Please try again.");
    }
  }
}}



          // onSubmit={async (values) => {
          //   console.log("Submitted values:", values);
          //   try {
          //     if (
          //       enrolldata.id === "" ||
          //       enrolldata.id === undefined ||
          //       enrolldata.id === null
          //     ) {
          //       console.log("new enrollement");
          //       const result = await axios.post(
          //         `http://localhost:8080/ems/v1/event/${id}/enroll`,
          //         values
          //       );
          //       console.log("result of enroll add", result.data);
          //     } else {
          //        console.log("update enrollement");
          //       const result = await axios.put(
          //         `http://localhost:8080/ems/v1/event/${id}/enroll/${enrolldata.id}`, ///event/:eventId/enroll/:enrollId
          //         values
          //       );
          //       console.log("result of enroll update", result.data.data);
          //     }
          //   } catch (err) {
          //     console.log("error in updating enrollment", err);
          //   }
          // }}
        >
          {({ handleChange, handleBlur, values, errors, touched }) => {
            console.log("Formik values.status:", values.status);
            return (
              <Form>
                <Stack spacing={3}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      name="status"
                      value={values.status}
                      label="Status"
                      onChange={handleChange}
                      error={touched.status && Boolean(errors.status)}
                      helperText={touched.status && errors.status}
                    >
                      <MenuItem value={1}>enrolled</MenuItem>
                      <MenuItem value={0}>unenrolled</MenuItem>
                    </Select>
                  </FormControl>
         


                  <Button type="submit" fullWidth variant="contained">
                    Update
                  </Button>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Box>
  );
}
