import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import { Link } from "react-router-dom";

function Menupage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = window.localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

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
  const products = [
    {
      id: 1,
      category: "lau",
      name: "LẨU VỊT NẤU CHAO",
      descriptive: "Description product.",
      price: "348,000₫",
      image: "/image/produce/lau/lau_vit_chao.jpg",
    },
    {
      id: 2,
      category: "nuong",
      name: "BÊ XÀO SẢ ỚT TÁI CHANH HẤP GỪNG",
      descriptive: "Description product.",
      price: "198,000₫",
      image: "/image/produce/Nướng/BÊ XÀO SẢ ỚT-TÁI CHANH-HẤP GỪNG.jpg",
    },
    {
      id: 3,
      category: "cuon",
      name: "BÒ LÁ LỐT CUỐN BÁNH HỎI",
      descriptive: "Description product.",
      price: "148,000₫",
      image: "/image/produce/Cuốn/BÒ LÁ LỐT CUỐN BÁNH HỎI.jpg",
    },
  ];
  const filteredProducts = products.filter((product) => {
    if (!searchQuery && selectedCategory === "All") {
      return true;
    } else if (!searchQuery && selectedCategory !== "All") {
      return product.category === selectedCategory;
    } else if (searchQuery && selectedCategory === "All") {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return (
        product.category === selectedCategory &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  });

  return (
    <Grid>
      <ResponsiveAppBar />
      <Container>
        <Grid container spacing={3} marginTop={1}>
          <Grid item>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item sx={{ minWidth: "12rem" }}>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Category"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="lau">LẨU</MenuItem>
                <MenuItem value="nuong">Nướng</MenuItem>
                <MenuItem value="cuon">Cuốn</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={3} marginTop={1}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <Link to={`/product/${product.id}`}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={`${product.image}`}
                    alt={product.name}
                  />
                </Link>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Giá: {product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#00470f",
                      "&:hover": { backgroundColor: "#a80e0e" },
                    }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Đặt
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
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
            {cartItems.map((item, index) => (
              <ListItem key={index}>
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <Typography variant="subtitle1">
                      Tên: {item.name}
                    </Typography>
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
      </Container>
      <Footer />
    </Grid>
  );
}

export default Menupage;
