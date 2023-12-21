import React, { useState } from "react";
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
  const [products, setProducts] = useState([
    {
      id: 1,
      image: "/public/image/produce/Nướng/BỒ CÂU BẰM XÚC BÁNH ĐA.jpg",
      name: "Product 1",
      price: 50,
      description:
        "This approach allows you to pre-fill the dialog with the product's information when editing and provides a way to save changes or add new products based on the state of the editedProduct variable.",
      category: "Lẩu",
    },
    {
      id: 2,
      image: "/public/image/produce/Cuốn/BÁNH XÈO TÉP ĐỒNG-TÔM THỊT.jpg",
      name: "Product 2",
      price: 75,
      description: "Description for Product 2",
      category: "Nướng",
    },
  ]);
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

  const handleDelete = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
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

  const handleAddProduct = () => {
    if (editedProduct.id) {
      const updatedProducts = products.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      );
      setProducts(updatedProducts);
    } else {
      setProducts((prevProducts) => [
        ...prevProducts,
        {
          id: prevProducts.length + 1,
          name: newProduct.name,
          price: newProduct.price,
          description: newProduct.description,
          category: newProduct.category,
        },
      ]);
    }
    handleCloseAddProductDialog();
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
    setEditedProduct((prevState) => ({
      ...prevState,
      image: URL.createObjectURL(file),
    }));
  };

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
                      src={product.image}
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
                      onClick={() => handleOpenDialog(product)}
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
                      onClick={() => handleDelete(product.id)}
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
            <Button onClick={handleCloseAddProductDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddProduct} color="primary">
              {editedProduct.id ? "Save Changes" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{selectedProduct && selectedProduct.name}</DialogTitle>
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
              defaultValue={selectedProduct ? selectedProduct.description : ""}
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
