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
    IconButton,
    CircularProgress,
} from "@mui/material";
import ResponsiveAppBar from "../../nav-bar";
import Footer from "../../footer";
import { Link } from "react-router-dom";
import { useMenuContext } from "../../../context/MenuContextProvider";
import { MdOutlineShoppingCart } from "react-icons/md";
import DrawerComponent from "../../Cart";

function Menupage() {
    const [currentPage, setCurrentPage] = useState(1);
    const {
        products,
        selectedCategory,
        searchQuery,
        handleSearchChange,
        handleCategoryChange,
        loading,
        isCartOpen,
        orderedProducts,
        calculateTotalPrice,
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

    const productsPerPage = 9;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    const pages = Array.from({
        length: Math.ceil(filteredProducts.length / productsPerPage),
    });
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const linkStyle = {
        textDecoration: "none",
        ml: 2,
    };
    const cardStyle = {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    };
    const newcolor = {
        color: "red",
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
                {loading ? (
                    <Grid container justifyContent="center">
                        <CircularProgress size={60} />
                    </Grid>
                ) : (
                    <Grid container spacing={3} marginTop={1}>
                        {currentProducts.map((product) => (
                            <Grid item xs={12} md={4} key={product.id}>
                                <Link
                                    to={`/product/${product.id}`}
                                    style={linkStyle}
                                >
                                    <Card style={cardStyle}>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            src={`data:image/png;base64, ${product.image}`}
                                            alt={product.name}
                                            loading="lazy"
                                        />

                                        <CardContent>
                                            <Typography
                                                variant="h6"
                                                component="div"
                                                style={newcolor}
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Giá:{" "}
                                                {new Intl.NumberFormat(
                                                    "vi-VN",
                                                    {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }
                                                ).format(product.price)}
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
            <Grid container justifyContent="center" marginTop={2}>
                {Array.from({
                    length: Math.ceil(products.length / productsPerPage),
                }).map((_, index) => (
                    <Button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        variant={
                            currentPage === index + 1 ? "contained" : "outlined"
                        }
                        sx={{ margin: "0.2rem" }}
                    >
                        {index + 1}
                    </Button>
                ))}
            </Grid>

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
export default Menupage;
