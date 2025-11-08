import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { cyan } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

function AppHeader() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const isMenuopen = Boolean(menuData);
  const openMenu = (event) => setMenuData(event.currentTarget);
  const closeMenu = () => setMenuData(null);
  const openProfileMenu = (event) => setProfileAnchorEl(event.currentTarget);
  const closeProfileMenu = () => setProfileAnchorEl(null); 
  return (
    <AppBar position="static" sx={{ backgroundColor: cyan[700] }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Event Management System
        </Typography>

        {!isAuthenticated && (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}

        {isAuthenticated && (
          <>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>

            {user?.data.role === "admin" && (
            <Button color="inherit" onClick={openMenu}>
              Events
            </Button>
            )}
            
            <Menu anchorEl={menuData} open={isMenuopen} onClose={closeMenu}>
              <MenuItem
                component={Link}
                to="/viewevents"
                color="inherit"
                sx={{ mr: 1 }}
              >
                View Events
              </MenuItem>
              <MenuItem
                component={Link}
                to="/addEvents"
                color="inherit"
                sx={{ mr: 1 }}
              >
                Add Event
              </MenuItem>
            </Menu>

            <IconButton sx={{ color: "white" }} onClick={openProfileMenu}>
              <AccountCircleIcon />
            </IconButton>

            {/* Profile Menu */}
            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={closeProfileMenu}
            >
              <MenuItem onClick={closeProfileMenu}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

            <Typography sx={{ ml: 2 }}>{user?.data.emailAddress}</Typography>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
