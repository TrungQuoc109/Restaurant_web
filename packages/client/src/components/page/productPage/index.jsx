import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ResponsiveAppBar from "../../nav-bar";
import Footer from "../../footer";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useMenuContext } from "../../../context/MenuContextProvider";
import DrawerComponent from "../../Cart";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const {
    isCartOpen,
    orderedProducts,
    setloading,
    handleAddToCart,
    handleDrawerOpen,
    handleDrawerClose,
    handleRemoveItem,
    calculateTotalPrice,
    handleUpdateQuantity,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
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
          throw new Error(`HTTP error! Status`);
        }
        const itemData = await response.json();
        setProduct(itemData);
      } catch (error) {
        console.error("Error fetching item detail:");
      } finally {
        setloading(false);
      }
    };

    fetchItemDetail();
  }, [id]);

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
                Giá:{" "}
                {product &&
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
              </Typography>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                mt={2}
              >
                <Button
                  onClick={() => {
                    handleAddToCart(product); // Add the 'product' to the ordered products array
                  }}
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
                <Link to="/menuPage" style={linkStyle}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#00470f",
                      "&:hover": {
                        backgroundColor: "#a80e0e",
                      },
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
      <DrawerComponent
        isCartOpen={isCartOpen}
        handleDrawerClose={handleDrawerClose}
        orderedProducts={orderedProducts}
        handleRemoveItem={handleRemoveItem}
        handleDecreaseQuantity={handleDecreaseQuantity}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleUpdateQuantity={handleUpdateQuantity}
        calculateTotalPrice={calculateTotalPrice}
      />

      <Footer />
    </Grid>
  );
}
export default ProductDetailPage;
