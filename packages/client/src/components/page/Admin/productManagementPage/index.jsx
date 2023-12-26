import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Typography,
    Button,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Grid,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Input,
} from "@mui/material";
import AdminPage from "../adminNav";

const ProductManagementPage = () => {
    const [products, setProducts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
    });

    const [editedProduct, setEditedProduct] = useState({
        id: null,
        name: "",
        price: "",
        description: "",
        category: "",
    });

    const handleOpenDialog = (product) => {
        setSelectedProduct(product);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setSelectedProduct(null);
        setOpenDialog(false);
    };

    const handleDelete = async (id) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
        );
        try {
            const response = await fetch(
                `http://localhost:8080/order/${id}/${type}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleOpenAddProductDialog = () => {
        setOpenAddProductDialog(true);
    };

    const handleCloseAddProductDialog = () => {
        setOpenAddProductDialog(false);
        setNewProduct({
            name: "",
            price: "",
            description: "",
            category: "",
        });
        setEditedProduct({
            id: null,
            name: "",
            price: "",
            description: "",
            category: "",
        });
    };
    const token = localStorage.getItem("jwtToken");
    const handleAddProduct = async () => {
        try {
            // const formData = new FormData();

            // // Thêm các trường dữ liệu vào FormData
            // formData.append("name", editedProduct.name || selectedProduct.name);
            // formData.append(
            //     "price",
            //     editedProduct.price || selectedProduct.price
            // );
            // formData.append(
            //     "description",
            //     editedProduct.description || selectedProduct.description
            // );
            // formData.append(
            //     "category",
            //     editedProduct.category || selectedProduct.category
            // );

            // // Thêm tệp tin nếu nó tồn tại
            // if (editedProduct.file) {
            //     formData.append("image", editedProduct.file);
            // }
            // console.log("edit", editedProduct, selectedProduct);
            // console.log(formData);
            const response = await fetch(
                editedProduct.id
                    ? `http://localhost:8080/admin/updateitem/${editedProduct.id}`
                    : "http://localhost:8080/admin/additem",
                {
                    method: "POST",
                    headers: {
                        // "Content-Type":
                        //     "multipart/form-data; boundary=<calculated when request is sent>",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(editedProduct),
                }
            );

            if (response.ok) {
                // const newProductData = await response.json();
                // console.log(newProductData);
                // const updatedProducts = editedProduct.id
                //     ? products.map((product) =>
                //           product.id === editedProduct.id
                //               ? {
                //                     ...newProductData,
                //                     image: newProductData.image.imageData.toString(
                //                         "base64"
                //                     ),
                //                 }
                //               : product
                //       )
                //     : [
                //           ...products,
                //           {
                //               ...newProductData,
                //               image: newProductData.image.imageData.toString(
                //                   "base64"
                //               ),
                //           },
                //       ];

                // setProducts(updatedProducts);
                handleCloseAddProductDialog();
            } else {
                throw new Error("Failed to add/update item");
            }
        } catch (error) {
            console.error("Error adding/updating item:", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
        setEditedProduct((prevEditedProduct) => ({
            ...prevEditedProduct,
            [name]: value,
        }));
    };

    const handleEdit = (product) => {
        setEditedProduct(product);
        setOpenAddProductDialog(true);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setEditedProduct((prevState) => ({
                ...prevState,
                // image: reader.result, // Lưu lại dưới dạng ArrayBuffer
                image: file, // Lưu lại đối tượng File
            }));
        };

        if (file) {
            reader.readAsArrayBuffer(file);
        }
    };
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/menu/admin"
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                //  console.log(data);
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
                setProducts(menuItems);
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
        };

        fetchMenuItems();
    }, []);
    return (
        <Grid>
            <AdminPage />
            <Container>
                <br />
                <Typography variant="h5">Menu </Typography>
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenAddProductDialog}
                    sx={{ mb: 2 }}
                >
                    Thêm món
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Ảnh</TableCell>
                                <TableCell>Tên món</TableCell>
                                <TableCell>Giá</TableCell>
                                <TableCell>Mô tả</TableCell>
                                <TableCell>Loại</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>
                                        <img
                                            src={`data:image/png;base64, ${product.image}`}
                                            alt={product.name}
                                            width="50"
                                            height="50"
                                        />
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price} đ</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() =>
                                                handleOpenDialog(product)
                                            }
                                        >
                                            View Description
                                        </Button>
                                    </TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleEdit(product)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog
                    open={openAddProductDialog}
                    onClose={handleCloseAddProductDialog}
                >
                    <DialogTitle>
                        {editedProduct.id ? "Edit Product" : "Add Product"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Tên món"
                            name="name"
                            value={editedProduct.name}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Giá"
                            name="price"
                            value={editedProduct.price}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Mô tả"
                            name="description"
                            value={editedProduct.description}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                            rows={6}
                            margin="normal"
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="category-label">Loại</InputLabel>
                            <Select
                                labelId="category-label"
                                label="Loại"
                                name="category"
                                value={editedProduct.category}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Lẩu">Lẩu</MenuItem>
                                <MenuItem value="Nướng">Nướng</MenuItem>
                                <MenuItem value="Cuốn">Cuốn</MenuItem>
                                {/* Add more categories as needed */}
                            </Select>
                        </FormControl>
                        <Input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            sx={{ mt: 2 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseAddProductDialog}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleAddProduct} color="primary">
                            {editedProduct.id ? "Save Changes" : "Add"}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>
                        {selectedProduct && selectedProduct.name}
                    </DialogTitle>
                    <br />
                    <DialogContent>
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            label="Description"
                            multiline
                            rows={10}
                            fullWidth
                            defaultValue={
                                selectedProduct
                                    ? selectedProduct.description
                                    : ""
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Grid>
    );
};

export default ProductManagementPage;
