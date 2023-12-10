import React, { useState } from "react";
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
  InputBase,
  Grid,
} from "@mui/material";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import ShoppingCartModel from "../cart";

const pageRoutes = {
  "Trang chủ": "/",
  MENU: "/menuPage",
  "THÔNG TIN NHÀ HÀNG": "/restaurantInfo",
  "ĐẶT BÀN": "/BookingTablePage",
};
const settings = [
  { label: "Đăng nhập", link: "/login" },
  { label: "Đăng ký", link: "/signup" },
];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openCart, setOpenCart] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#746c63" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 5, m: "0.5rem" }}>
            <IconButton component={Link} to="/">
              <img
                src="/public/image/logo.webp"
                style={{ height: "5rem" }}
                alt="Logo"
              />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 5, display: { xs: "none", md: "flex" } }}>
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
            <IconButton
              onClick={handleOpenCart}
              sx={{
                backgroundColor: "#bdbdbd",
                borderRadius: "50%",
                padding: "1rem",
                mr: 1,
                fontSize: "1rem",
              }}
            >
              <MdOutlineShoppingCart fontSize="large" />
            </IconButton>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0, width: "3rem", height: "3rem" }}
            >
              <Avatar alt="Remy Sharp" sx={{ width: "100%", height: "100%" }} />
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
              {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    component={Link}
                    to={setting.link}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      <Box sx={{ position: "relative" }}>
        <ShoppingCartModel open={openCart} handleClose={handleCloseCart} />
      </Box>
    </AppBar>
  );
}

export default ResponsiveAppBar;
