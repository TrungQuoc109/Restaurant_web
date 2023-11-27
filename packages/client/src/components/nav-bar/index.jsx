import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import { BiSearch } from "react-icons/bi";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";

const pages = ["MENU", "THÔNG TIN NHÀ HÀNG", "KHUYẾN MÃI", "ĐẶT BÀN", "TƯ VẤN"];
const settings = ["Đăng nhập", "Đăng ký"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#746c63" }}>
      <Container maxWidth="0">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, m: "0.5rem" }}>
            <IconButton component={Link} to="/">
              <img src="/public/image/logo.webp" style={{ height: "5rem" }} />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0.5, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={
                  page === "MENU"
                    ? "/menuPage"
                    : page === "ĐẶT BÀN"
                    ? "/datbanPage"
                    : `/${page.toLowerCase().replace(" ", "-")}`
                }
                onClick={handleCloseNavMenu}
                sx={{ m: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0.6, mr: "15rem", ml: "2rem" }}>
            <Grid
              container
              alignItems="center"
              sx={{
                border: "1px solid #ccc",
                borderRadius: "9rem",
                background: "#fff",
                padding: "0.3rem",
              }}
            >
              <InputBase
                sx={{ flex: 1 }}
                placeholder="Tìm kiếm..."
                inputProps={{ "aria-label": "Tìm kiếm..." }}
              />
              <Grid item>
                <IconButton type="button" aria-label="search">
                  <BiSearch />
                </IconButton>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ position: "relative" }}>
            <Tooltip title="Open settings">
              <IconButton
                sx={{
                  backgroundColor: "#bdbdbd",
                  borderRadius: "50%",
                  padding: "1rem",
                  mr: 1,
                }}
              >
                <MdOutlineShoppingCart />
              </IconButton>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  backgroundColor: "#bdbdbd",
                  borderRadius: "50%",
                  padding: "0.5rem",
                }}
              >
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
