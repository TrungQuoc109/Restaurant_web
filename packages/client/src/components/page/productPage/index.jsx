import React from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import ResponsiveAppBar from "../../Nav-bar";
import Footer from "../../footer";

const ProductDetailPage = ({ products }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <Typography variant="h4">Product not found</Typography>;
  }

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
      <Footer />
    </Grid>
  );
};

export default ProductDetailPage;
