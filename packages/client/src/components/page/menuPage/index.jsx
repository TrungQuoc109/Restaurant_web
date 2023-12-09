import React, { useState } from "react";
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
} from "@mui/material";
import ResponsiveAppBar from "../../Nav-bar";
import Footer from "../../footer";

function Menupage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const products = [
    {
      id: 1,
      category: "lau",
      name: "LẨU VỊT NẤU CHAO",
      price: "348,000₫",
      image: "public/image/produce/Lẩu/LẨU VỊT NẤU CHAO.jpg",
    },
    {
      id: 2,
      name: "BÊ XÀO SẢ ỚT TÁI CHANH HẤP GỪNG",
      category: "nuong",
      price: "198,000₫",
      image: "public/image/produce/Nướng/BÊ XÀO SẢ ỚT-TÁI CHANH-HẤP GỪNG.jpg",
    },
    {
      id: 3,
      name: "BÒ LÁ LỐT CUỐN BÁNH HỎI",
      category: "cuon",
      price: "148,000₫",
      image: "/public/image/produce/Cuốn/BÒ LÁ LỐT CUỐN BÁNH HỎI.jpg",
    },
  ];

  const filteredProducts = products.filter((product) => {
    if (searchQuery && !selectedCategory) {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (selectedCategory && !searchQuery) {
      return product.category === selectedCategory;
    } else if (selectedCategory && searchQuery) {
      return (
        product.category === selectedCategory &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return products;
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
                <MenuItem value="">All</MenuItem>
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
                <CardMedia
                  component="img"
                  height="300"
                  image={`${product.image}`}
                  alt={product.name}
                />
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
    </Grid>
  );
}

export default Menupage;
