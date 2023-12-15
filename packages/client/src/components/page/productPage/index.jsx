import React, { useState, useEffect } from "react";
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

function ProductDetailPage() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    useEffect(() => {
        const fetchItemDetail = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/menu/${id}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const itemData = await response.json();
                setItem(itemData);
            } catch (error) {
                console.error("Error fetching item detail:", error);
            }
        };

        fetchItemDetail();
    }, [id]);
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
                        {item && item.image && (
                            <CardMedia
                                component="img"
                                height="auto"
                                src={`data:image/png;base64, ${item.image.imageData}`}
                                alt={item.name}
                            />
                        )}
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                {item && item.name}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                {item && item.description}
                            </Typography>
                            <Typography
                                variant="h6"
                                color="textSecondary"
                                gutterBottom
                            >
                                Category: {item && item.category}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Price: {item && item.price}
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
}

export default ProductDetailPage;
