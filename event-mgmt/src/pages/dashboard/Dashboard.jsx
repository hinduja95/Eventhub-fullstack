import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import Eventlistcard from "../Eventlistcard";
import { Link, useNavigate } from "react-router-dom";
import { cyan } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
export function Dashboard() {

  // const [menuData, setMenuData] = useState(null);
  // const isMenuopen = Boolean(menuData);
  // const navigate =useNavigate();

  // const openMenu = (event) => setMenuData(event.currentTarget);
  // const closeMenu = () => setMenuData(null);


  return (

    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
      }}
    >
     
      
    {/* //   <AppBar position="static" sx={{ backgroundColor: cyan[700] }}>
    //     <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
    //       <Typography variant="h6" component="div">
    //         Event Management System
    //       </Typography>
    //       <Button color="inherit" onClick={openMenu}>
    //         Events
    //       </Button>

    //       <Menu anchorEl={menuData} open={isMenuopen} onClose={closeMenu}>
    //         <MenuItem  component={Link}
    //           to="/viewevents"
    //           color="inherit"
    //           sx={{ mr: 1 }}>View Events</MenuItem>
    //         <MenuItem
    //           component={Link}
    //           to="/addEvents"
    //           color="inherit"
    //           sx={{ mr: 1 }}
    //         >
    //           Add Event
    //         </MenuItem>
    //       </Menu>
    //     </Toolbar>
    //   </AppBar> */}
      {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f4f8",
          padding: 4,
        }}
      > */}

        <Container maxWidth={false} sx={{ textAlign: "center", px: 6 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome to EMS...
          </Typography>
          <Eventlistcard />
        </Container>
      </Box>
    // </Box>
        
    
  )
}
