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
import { useMenuContext } from "../../context/MenuContextProvider";
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
  const { isLoggedIn, handleLogout } = useMenuContext();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#746c63" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 4, m: "0.5rem", ml: -1 }}>
            <IconButton component={Link} to="/">
              <img
                src="/public/image/logo.webp"
                style={{ height: "5rem" }}
                alt="Logo"
              />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 5, display: { xs: "none", md: "flex" } }}>
            {Object.entries(pageRoutes).map(([page, route]) => {
              let destination = route;
              if (page === "ĐẶT BÀN") {
                destination = isLoggedIn ? pageRoutes[page] : "/login";
              }

              return (
                <Button
                  key={page}
                  component={Link}
                  to={destination}
                  sx={{ m: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ position: "relative" }}>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0, width: "3rem", height: "3rem" }}
            >
              <Avatar alt="User" sx={{ width: "100%", height: "100%" }} />
            </IconButton>
            <Menu
              sx={{ mt: "3rem" }}
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
              {isLoggedIn ? (
                <>
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to="/userpage"
                    textAlign="center"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Tài khoản
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleCloseUserMenu();
                      window.location.href = "/login";
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
