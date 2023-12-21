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
        handleAddToCart,
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
                        {filteredProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <Card>
                                    <Link
                                        to={`/product/${product.id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={`data:image/png;base64,${product.image}`}
                                            alt={product.name}
                                        />

                                        <CardContent>
                                            <Typography
                                                variant="h6"
                                                component="div"
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Giá: {product.price} VND
                                            </Typography>

                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "#00470f",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "#a80e0e",
                                                    },
                                                }}
                                                onClick={() =>
                                                    handleAddToCart(product)
                                                }
                                            >
                                                Đặt
                                            </Button>
                                        </CardContent>
                                   
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
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
                <Drawer
                    anchor="right"
                    open={isCartOpen}
                    onClose={handleDrawerClose}
                >
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
                                        <Typography variant="body2">
                                            Giá: {item.price}VND
                                        </Typography>
                                        <Typography variant="body2">
                                            Số lượng: {item.quantity}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() =>
                                                handleRemoveItem(index)
                                            }
                                        >
                                            Xóa
                                        </Button>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))}
                        <Divider />
                        <ListItem>
                            <ListItemText primary={`Tổng: ${totalPrice} VND`} />
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
            </Container>
            <Footer />
        </Grid>
    );
}
export default Menupage;
