import React from "react";
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
  CircularProgress,
} from "@mui/material";
import ResponsiveAppBar from "../../Nav-bar";
import Footer from "../../footer";
import { Link } from "react-router-dom";
import { useMenuContext } from "../../../context/MenuContextProvider";
import { MdOutlineShoppingCart } from "react-icons/md";

function Menupage() {
  const {
    products,
    selectedCategory,
    searchQuery,
    handleSearchChange,
    handleCategoryChange,
    loading,
    isCartOpen,
    cartItems,
    totalPrice,
    handleDrawerOpen,
    handleDrawerClose,
    handleRemoveItem,
    handleUpdateQuantity,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
  } = useMenuContext();

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
  const linkStyle = {
    textDecoration: "none",
    ml: 2,
  };
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
                <MenuItem value="Lẩu">Lẩu</MenuItem>
                <MenuItem value="Nướng">Nướng</MenuItem>
                <MenuItem value="Cuốn">Cuốn</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {loading ? (
          <Grid container justifyContent="center">
            <CircularProgress size={60} />
          </Grid>
        ) : (
          <Grid container spacing={3} marginTop={1}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Link to={`/product/${product.id}`} style={linkStyle}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="300"
                      src={`data:image/png;base64, ${product.image}`}
                      alt={product.name}
                      loading="lazy"
                    />

                    <CardContent>
                      <Typography variant="h6" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Giá: {product.price} đ
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
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
              </Grid>
            </ListItem>
          ))}
          <Divider />
          <ListItem>
            <ListItemText primary={`Tổng: ${totalPrice}`} />
          </ListItem>
        </List>
        <Container>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              // Handle functionality for 'Check out' button
            }}
          >
            Check out
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              // Handle functionality for 'Xác nhận đặt bàn' button
            }}
          >
            Xác nhận đặt bàn
          </Button>
        </Container>
      </Drawer>
      <Footer />
    </Grid>
  );
}
export default Menupage;
