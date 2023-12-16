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
    const [products, setMenu] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch("http://localhost:8080/menu/");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const menuItems = await Promise.all(
                    data.map(async (item) => {
                        const itemResponse = await fetch(
                            `http://localhost:8080/menu/${item.id}`
                        );
                        if (!itemResponse.ok) {
                            throw new Error(
                                `HTTP error! Status: ${itemResponse.status}`
                            );
                        }
                        const itemData = await itemResponse.json();
                        return {
                            ...item,
                            image: itemData.image.imageData.toString("base64"),
                        };
                    })
                );
                setMenu(menuItems);
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
        };

        fetchMenuItems();
    }, []);

    const filteredProducts = products.filter((product) => {
        if (!searchQuery && selectedCategory === "All") {
            return true;
        } else if (!searchQuery && selectedCategory !== "All") {
            return product.category === selectedCategory;
        } else if (searchQuery && selectedCategory === "All") {
            return product.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        } else {
            return (
                product.category === selectedCategory &&
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
    });
    return (
        <div>
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
                            <InputLabel id="category-select-label">
                                Category
                            </InputLabel>
                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                label="Category"
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Lẩu">Lẩu</MenuItem>
                                <MenuItem value="Nướng">Nướng</MenuItem>
                                <MenuItem value="Cuốn">Cuốn</MenuItem>
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
                                        src={`data:image/png;base64, ${product.image}`}
                                        alt={product.name}
                                        loading="lazy"
                                    />
                                </Link>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Giá: {product.price}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#00470f",
                                            "&:hover": {
                                                backgroundColor: "#a80e0e",
                                            },
                                        }}
                                    >
                                        Đặt
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer />
        </div>
    );
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
