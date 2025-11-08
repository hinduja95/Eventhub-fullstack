import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { cyan } from '@mui/material/colors';

export  function Home() {
    
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header / Navbar */}
      {/* <AppBar position="static" sx={{ backgroundColor: cyan[700] }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
             Event Management System
          </Typography>
          <Box>
            <Button component={Link} to="/login" color="inherit" >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              color="inherit"
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar> */}

      {/* Main Centered Section */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f4f8",
          padding: 4,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome to the Event Management System
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
