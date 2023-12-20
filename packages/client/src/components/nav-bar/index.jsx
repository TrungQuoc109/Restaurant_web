import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const pageRoutes = {
  "Trang chủ": "/",
  MENU: "/menuPage",
  "THÔNG TIN NHÀ HÀNG": "/aboutus",
  "ĐẶT BÀN": "/BookingTablePage",
};
const settings = [
  { label: "Đăng nhập", link: "/login" },
  { label: "Đăng ký", link: "/signup" },
];

function ResponsiveAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for JWT token in localStorage on component mount
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Clear token from localStorage and update login status
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#746c63" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 4, m: "0.5rem", ml: -1 }}>
            {/* Logo */}
            <IconButton component={Link} to="/">
              <img
                src="/public/image/logo.webp"
                style={{ height: "5rem" }}
                alt="Logo"
              />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 5, display: { xs: "none", md: "flex" } }}>
            {/* Page Routes */}
            {Object.entries(pageRoutes).map(([page, route]) => (
              <Button
                key={page}
                component={Link}
                to={route}
                sx={{ m: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ position: "relative" }}>
            {/* User Menu */}
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0, width: "3rem", height: "3rem" }}
            >
              <Avatar alt="User" sx={{ width: "100%", height: "100%" }} />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* Conditional Rendering based on login status */}
              {isLoggedIn ? (
                <>
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to="/user-information"
                    textAlign="center"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Tài khoản
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleCloseUserMenu();
                    }}
                    textAlign="center"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Đăng xuất
                  </MenuItem>
                </>
              ) : (
                settings.map((setting) => (
                  <MenuItem
                    key={setting.label}
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to={setting.link}
                    textAlign="center"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {setting.label}
                  </MenuItem>
                ))
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
