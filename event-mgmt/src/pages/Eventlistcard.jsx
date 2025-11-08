import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Eventlistcard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/ems/v1/event/list");
      console.log("rex",res)
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = (eventId) => {
    navigate(`/enroll/${eventId}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (events.length === 0) {
    return <Typography>No events found.</Typography>;
  }

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        {events.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={3} lg={3} xl={3} height="100">
            <Card
              sx={{
                width:250,
                Height: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 4,
                padding: 2,
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {event.event_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>📍 Location:</strong> {event.event_location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>🗓️ Date:</strong> {event.event_date}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={() => handleEnroll(event.id)}
                  sx={{ width: "90%" }}
                >
                  Enroll Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Eventlistcard;
