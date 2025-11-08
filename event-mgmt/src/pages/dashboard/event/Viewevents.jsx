// import React, { useState, useEffect } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Card, Box, CardHeader, CardContent } from "@mui/material";
// import axios from "axios";

// const paginationModel = { page: 0, pageSize: 5 };

// const columns = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "eventName", headerName: "Event Name", width: 200 },
//   { field: "eventDescription", headerName: "Location", width: 150 },
//   { field: "eventDate", headerName: "Date", width: 150 },
//   { field: "eventLocation",headerName:"Location",width:150}
// ];

// export default function Viewevents() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchEventList();
//   }, []);

//   const fetchEventList = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/ems/v1/event/list");
//       setEvents(res.data);
//     } catch (error) {
//       console.error("Failed to fetch event list:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "80vh",
//         width: "90vw",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         bgcolor: "rgba(255, 255, 255, 1)",
//         p: 2,
//       }}
//     >
//       <Card sx={{ height: 500, width: "80%" }}>
//         <CardHeader title="Events" sx={{ textAlign: "center" }} />
//         <CardContent sx={{ height: 400, p: 0 }}>
//           <DataGrid
//             rows={events}
//             columns={columns}
//             loading={loading}
//             getRowId={(row) =>row.id}
//             initialState={{ pagination: { paginationModel } }}
//             pageSizeOptions={[5, 10]}
//             checkboxSelection
//             sx={{
//               border: "2px solid #333",
//               "& .MuiDataGrid-cell": {
//                 borderColor: "#444",
//               },
//               "& .MuiDataGrid-columnHeaders": {
//                 borderBottom: "2px solid #444",
//               },
//             }}
//           />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const Viewevents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchViewevents();
  }, []);

  const fetchViewevents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/ems/v1/event/listall");
      console.log(res.data);
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to fetch event list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    navigate(`/modifyevent/${event.id}`);
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
      <Card
        sx={{
          width: "100%",
          maxWidth: "95%",
          minHeight: "90vh",
          overflow: "auto",
        }}
      >
        <CardHeader
          title="Event List"
          sx={{
            textAlign: "center",
            backgroundColor: "#068990ff",
            color: "white",
            py: 2,
          }}
          action={
            <Button component={Link} to="/dashboard" color="inherit">
              Home
            </Button>
          }
        />
        <CardContent>
          {loading ? (
            <Typography align="center">Loading...</Typography>
          ) : events.length === 0 ? (
            <Typography align="center">No events found.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
                    <TableCell>S.No</TableCell>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Event Date</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Published On</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((event, index) => (
                    <TableRow key={event.id || index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{event.event_name}</TableCell>
                      <TableCell>{event.event_date}</TableCell>
                      <TableCell>{event.event_location}</TableCell>
                      <TableCell>{event.publish_to}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => handleEdit(event)}
                          color="inherit"
                          startIcon={<EditIcon />}
                          sx={{ mr: 1 }}
                        >
                          EDIT
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Viewevents;
