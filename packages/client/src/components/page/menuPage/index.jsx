import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
} from "@mui/material";
import ResponsiveAppBar from "../../Nav-bar";
import Footer from "../../footer";

function Menupage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const handleCategoryButtonClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    console.log(`Category button "${category}" clicked`);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div>
      <ResponsiveAppBar />
      <Container>
        <Grid container spacing={3} marginTop={1}>
          <Grid item>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleCategoryButtonClick(null)}
              sx={{
                backgroundColor:
                  selectedCategory === null ? "#a80e0e" : "#434343",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === null ? "#434343" : "#a80e0e",
                },
                padding: "0.6rem 2rem",
                borderRadius: 30,
              }}
            >
              ALL
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleCategoryButtonClick("lau")}
              sx={{
                backgroundColor:
                  selectedCategory === "lau" ? "#a80e0e" : "#434343",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === "lau" ? "#434343" : "#a80e0e",
                },
                marginLeft: -2,
                padding: "0.6rem 2rem",
                borderRadius: 30,
              }}
            >
              LẨU
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleCategoryButtonClick("nuong")}
              sx={{
                backgroundColor:
                  selectedCategory === "nuong" ? "#a80e0e" : "#434343",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === "nuong" ? "#434343" : "#a80e0e",
                },
                marginLeft: -4,
                padding: "0.6rem 2rem",
                borderRadius: 30,
              }}
            >
              Nướng
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleCategoryButtonClick("cuon")}
              sx={{
                backgroundColor:
                  selectedCategory === "cuon" ? "#a80e0e" : "#434343",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === "cuon" ? "#434343" : "#a80e0e",
                },
                marginLeft: -6,
                padding: "0.6rem 2rem",
                borderRadius: 30,
              }}
            >
              Cuốn
            </Button>
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
    </div>
  );
}

export default Menupage;
