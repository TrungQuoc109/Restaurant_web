import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  } = useMenuContext();
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
        setLoading(false);
      }
    };

    fetchItemDetail();
  }, [id]);

  if (loading) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  // const handleAddToCart = () => {
  //   const existingItemIndex = cartItems.findIndex(
  //     (cartItem) => cartItem.id === product.id
  //   );

  //   if (existingItemIndex !== -1) {
  //     const updatedCartItems = [...cartItems];
  //     updatedCartItems[existingItemIndex].quantity += 1;
  //     setCartItems(updatedCartItems);
  //   } else {
  //     setCartItems([...cartItems, { ...product, quantity: 1 }]);
  //   }
  // };

  // const handleRemoveItem = (index) => {
  //   const updatedCartItems = [...cartItems];
  //   updatedCartItems.splice(index, 1);
  //   setCartItems(updatedCartItems);
  // };

  // const handleDrawerOpen = () => {
  //   setIsCartOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setIsCartOpen(false);
  // };

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
                    Go Back
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
                <Grid item xs={8}>
                  <Typography variant="subtitle1">
                    Tên: {product.name}
                  </Typography>
                  <Typography variant="body2">Giá: {product.price}</Typography>
                  <Typography variant="body2">
                    Số lượng: {product.quantity}
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
}
export default ProductDetailPage;
