import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import ResponsiveAppBar from "../../Nav-bar";
import Footer from "../../footer";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useMenuContext } from "../../../context/MenuContextProvider";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const {
    cartItems,
    isCartOpen,
    totalPrice,
    loading,
    handleAddToCart,
    handleDrawerOpen,
    handleDrawerClose,
    handleRemoveItem,
    handleUpdateQuantity,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    handleUserCheckout,
  } = useMenuContext();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8080/menu/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const itemData = await response.json();
        setProduct(itemData);
      } catch (error) {
        console.error("Error fetching item detail:", error);
      } finally {
        loading(false);
      }
    };

    fetchItemDetail();
  }, [id]);

  if (loading) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  const linkStyle = {
    textDecoration: "none",
    ml: 2,
  };

  return (
    <Grid>
      <ResponsiveAppBar />
      <Grid
        container
        justifyContent="space-around"
        sx={{ height: "40rem", paddingInline: "20rem", mt: "2rem" }}
      >
        <Grid item xs={12} sm={6} style={{ maxWidth: "600px" }}>
          <Card>
            {product && product.image && (
              <CardMedia
                component="img"
                height="auto"
                src={`data:image/png;base64, ${product.image.imageData}`}
                alt={product.name}
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {product && product.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Mô tả: {product && product.description}
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Loại: {product && product.category}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Giá: {product && product.price}
              </Typography>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                mt={2}
              >
                <Button
                  onClick={() => handleAddToCart(product)}
                  variant="contained"
                  sx={{
                    backgroundColor: "#00470f",
                    "&:hover": { backgroundColor: "#a80e0e" },
                  }}
                >
                  Đặt
                </Button>
                <Link to="/menuPage" style={linkStyle}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#00470f",
                      "&:hover": { backgroundColor: "#a80e0e" },
                    }}
                  >
                    Trở lại
                  </Button>
                </Link>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        onClick={handleDrawerOpen}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 999,
          backgroundColor: "#bdbdbd",
          borderRadius: "50%",
          padding: "1rem",
          mr: 1,
          fontSize: "2rem",
        }}
      >
        <MdOutlineShoppingCart />
      </IconButton>

      <Drawer anchor="right" open={isCartOpen} onClose={handleDrawerClose}>
        <List sx={{ width: 400 }}>
          <ListItem>
            <ListItemText primary="Giỏ hàng" />
          </ListItem>
          <Divider />
          {cartItems.map((product, index) => (
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
                  <Typography variant="subtitle1">
                    Tên: {product.name}
                  </Typography>
                  <br />
                  <Typography variant="body2">Giá: {product.price}</Typography>
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
            <ListItemText primary={`Tổng: ${totalPrice}`} />
          </ListItem>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                onClick={handleUserCheckout}
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#00470f",
                  "&:hover": { backgroundColor: "#a80e0e" },
                }}
                fullWidth
              >
                Checkout
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  // Xử lý cho nút 'Xác nhận đặt bàn'
                }}
              >
                Đặt bàn
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
      <Footer />
    </Grid>
  );
}
export default ProductDetailPage;
