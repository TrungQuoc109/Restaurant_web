import React from "react";
import AutoScrollingBanner from "../../banners";
import Footer from "../../footer";
import ResponsiveAppBar from "../../nav-bar";

import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";

const products = [
  {
    id: 1,
    name: "CƠM CHÁY CHẤM KHO QUẸT",
    price: "148,000₫",
    image:
      "/public/image/produce/com_chay_kho_quet__1__66813257e166432da044c6894b36da68_medium.jpg",
  },
  {
    id: 2,
    name: "LẨU CÁ KÈO LÁ GIANG ",
    price: "398,000₫",
    image:
      "/public/image/produce/lau_ca_keo__2__cf8deed9ec9d45249d9fc76051e37401_medium.jpg",
  },
  {
    id: 3,
    name: "LẨU GÀ LÁ GIANG",
    price: "478,000₫",
    image:
      "/public/image/produce/lau_ga_la_giang_a704ccce60ba40da80df0e6e376f4867_medium.jpg",
  },
];

function Homepage() {
  return (
    <Box>
      <ResponsiveAppBar />
      <AutoScrollingBanner />
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ mt: "5rem" }}>
          <Grid item xs={12}>
            <Typography
              sx={{ color: "#a80e0e" }}
              variant="h4"
              align="center"
              gutterBottom
            >
              Bạn muốn ăn gì?
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
              Với thực đơn gần 100 món ăn, đậm chất miền Nam Bộ, nhà hàng Phương
              Nam chắc chắn sẽ chinh phục được vị giác của bạn chỉ sau 1 lần
              thử!
            </Typography>
          </Grid>
          {products.map((product) => (
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
        <Grid item xs={12} sx={{ paddingTop: "1rem", textAlign: "center" }}>
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1dn7AFqMjcRrIh5nXoiTzm-XOazaurWrX&ehbc=2E312F"
            width="1090"
            height="450"
            style={{ border: 0, m: "1" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default Homepage;
