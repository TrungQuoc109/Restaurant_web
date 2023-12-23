import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  CardMedia,
  IconButton,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
function DrawerComponent({
  isCartOpen,
  handleDrawerClose,
  orderedProducts,
  handleRemoveItem,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  handleUpdateQuantity,
  calculateTotalPrice,
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Drawer anchor="right" open={isCartOpen} onClose={handleDrawerClose}>
      <List sx={{ width: 400 }}>
        <ListItem>
          <ListItemText primary="Giỏ hàng" />
        </ListItem>
        <Divider />
        {orderedProducts.map((product, index) => (
          <ListItem key={index}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                {product.image && product.image.imageData && (
                  <CardMedia
                    component="img"
                    height="100"
                    src={`data:image/png;base64, ${product.image.imageData}`}
                    alt={product.name}
                  />
                )}
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle1">Tên: {product.name}</Typography>
                <br />
                <Typography variant="body2">
                  Giá:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography sx={{ mt: 1 }}>Số lượng: </Typography>
                  <IconButton
                    onClick={() => handleDecreaseQuantity(index)}
                    sx={{ flex: "none" }}
                  >
                    -
                  </IconButton>
                  <TextField
                    type="number"
                    value={product.quantity}
                    sx={{
                      width: "5rem",
                      height: "1.875rem",
                      mx: "0.5rem",
                      "& input[type='number']": {
                        width: "100%",
                        height: "100%",
                        padding: "0.5rem",
                        borderRadius: "0",
                        "&::-webkit-inner-spin-button": {
                          "-webkit-appearance": "none",
                          margin: 0,
                        },
                      },
                    }}
                    onChange={(event) => {
                      const newQuantity = parseInt(event.target.value, 10);
                      if (!isNaN(newQuantity)) {
                        handleUpdateQuantity(index, newQuantity);
                      }
                    }}
                  />
                  <IconButton
                    onClick={() => handleIncreaseQuantity(index)}
                    sx={{ flex: "none" }}
                  >
                    +
                  </IconButton>
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveItem(index)}
                >
                  Xóa
                </Button>
              </Grid>
              <Grid item xs={12}>
                <br />
                <Divider />
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          width: "88.11%",
          bgcolor: "background.paper",
          py: 2,
          px: 3,
          zIndex: 999,
        }}
      >
        <ListItem>
          <ListItemText
            primary={`Tổng: ${new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(calculateTotalPrice())}`}
          />
        </ListItem>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Link to={isLoggedIn ? "/checkout" : "/login"}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#00470f",
                  "&:hover": { backgroundColor: "#a80e0e" },
                }}
                fullWidth
                onClick={handleDrawerClose}
              >
                Checkout
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link to={isLoggedIn ? "/BookingTablePage" : "/login"}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#00470f",
                  "&:hover": { backgroundColor: "#a80e0e" },
                }}
                fullWidth
                onClick={() => {
                  handleDrawerClose();
                  handleTabChange(1);
                }}
              >
                Đặt bàn
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
}

export default DrawerComponent;
