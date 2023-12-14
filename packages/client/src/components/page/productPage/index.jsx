import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
import ResponsiveAppBar from "../../Nav-bar";
import Footer from "../../footer";
import { MdOutlineShoppingCart } from "react-icons/md";

const ProductDetailPage = ({ products }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = window.localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  if (!product) {
    return <Typography variant="h4">Product not found</Typography>;
  }
  const handleAddToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = cartItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };
  useEffect(() => {
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const storedCartItems = window.localStorage.getItem("cartItems");
    setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
  }, []);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += parseFloat(item.price) * item.quantity;
    });
    setTotalPrice(total.toFixed(3));
  }, [cartItems]);

  const handleDrawerOpen = () => {
    setIsCartOpen(true);
  };
  const handleDrawerClose = () => {
    setIsCartOpen(false);
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
            <CardMedia
              component="img"
              height="auto"
              image={product.image}
              alt={product.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Category: {product.category}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Price: {product.price}
              </Typography>
              <Button
                onClick={() => handleAddToCart(product)}
                variant="contained"
                sx={{
                  mt: "1rem",
                  backgroundColor: "#00470f",
                  "&:hover": { backgroundColor: "#a80e0e" },
                }}
              >
                Đặt
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Floating Cart Button */}
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

      {/* Cart Drawer */}
      <Drawer anchor="right" open={isCartOpen} onClose={handleDrawerClose}>
        <List sx={{ width: 400 }}>
          <ListItem>
            <ListItemText primary="Giỏ hàng" />
          </ListItem>
          <Divider />
          {cartItems.map((item, index) => (
            <ListItem key={index}>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1">Tên: {item.name}</Typography>
                  <Typography variant="body2">Giá: {item.price}</Typography>
                  <Typography variant="body2">
                    Số lượng: {item.quantity}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Xóa
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
          ))}
          <Divider />
          <ListItem>
            <ListItemText primary={`Tổng: ${totalPrice}`} />
          </ListItem>
        </List>
      </Drawer>

      <Footer />
    </Grid>
  );
};

export default ProductDetailPage;
