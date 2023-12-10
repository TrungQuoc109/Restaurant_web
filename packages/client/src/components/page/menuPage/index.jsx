import { useEffect, useState } from "react";
import {
<<<<<<< HEAD
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Container,
=======
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
>>>>>>> 8e98cfe5bc2331023d258495e49c3d36c38d221b
} from "@mui/material";
import ResponsiveAppBar from "../../Nav-bar";
import Footer from "../../footer";

function Menupage() {
<<<<<<< HEAD
    const [selectedCategory, setSelectedCategory] = useState(null);
=======
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
>>>>>>> 8e98cfe5bc2331023d258495e49c3d36c38d221b

    const [products, setMenu] = useState([]);

<<<<<<< HEAD
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
                console.log(menuItems);
                setMenu(menuItems);
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
        };

        fetchMenuItems();
    }, []);

    const handleCategoryButtonClick = (category) => {
        setSelectedCategory(category === selectedCategory ? null : category);
        //console.log(`Category button "${category}" clicked`);
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
                                    selectedCategory === null
                                        ? "#a80e0e"
                                        : "#434343",
                                "&:hover": {
                                    backgroundColor:
                                        selectedCategory === null
                                            ? "#434343"
                                            : "#a80e0e",
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
                            onClick={() => handleCategoryButtonClick("Lẩu")}
                            sx={{
                                backgroundColor:
                                    selectedCategory === "Lẩu"
                                        ? "#a80e0e"
                                        : "#434343",
                                "&:hover": {
                                    backgroundColor:
                                        selectedCategory === "Lẩu"
                                            ? "#434343"
                                            : "#a80e0e",
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
                            onClick={() => handleCategoryButtonClick("Nướng")}
                            sx={{
                                backgroundColor:
                                    selectedCategory === "Nướng"
                                        ? "#a80e0e"
                                        : "#434343",
                                "&:hover": {
                                    backgroundColor:
                                        selectedCategory === "Nướng"
                                            ? "#434343"
                                            : "#a80e0e",
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
                            onClick={() => handleCategoryButtonClick("Cuốn")}
                            sx={{
                                backgroundColor:
                                    selectedCategory === "Cuốn"
                                        ? "#a80e0e"
                                        : "#434343",
                                "&:hover": {
                                    backgroundColor:
                                        selectedCategory === "Cuốn"
                                            ? "#434343"
                                            : "#a80e0e",
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
                                    src={`data:image/png;base64, ${product.image}`}
                                    alt={product.name}
                                />

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
=======
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
>>>>>>> 8e98cfe5bc2331023d258495e49c3d36c38d221b
}

export default Menupage;
