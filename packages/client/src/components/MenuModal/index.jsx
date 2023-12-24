import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Grid,
  Divider,
  Box,
} from "@mui/material";
import { useMenuContext } from "../../context/MenuContextProvider";

const ProductModal = ({
  open,
  onClose,
  handleAddProduct,
  handleIncreaseQuantityAdminMenu,
  handleUpdateQuantityAdmin,
  handleDecreaseQuantityAdmin,
}) => {
  const { products, productQuantities } = useMenuContext();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Menu</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Tên món</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => handleDecreaseQuantityAdmin(index)}
                          sx={{ flex: "none" }}
                        >
                          -
                        </IconButton>
                        <TextField
                          type="number"
                          value={productQuantities[index]}
                          sx={{
                            width: "5rem",
                            height: "1.875rem",
                            mx: "0.5rem",
                            "& input[type='number']": {
                              width: "100%",
                              height: "100%",
                              padding: "0.5rem",
                              borderRadius: "0",
                              "&::-webkit-inner-spin-button": {
                                "-webkit-appearance": "none",
                                margin: 0,
                              },
                            },
                          }}
                          onChange={(event) => {
                            const newQuantity = parseInt(
                              event.target.value,
                              10
                            );
                            if (!isNaN(newQuantity)) {
                              handleUpdateQuantityAdmin(index, newQuantity);
                            }
                          }}
                        />
                        <IconButton
                          onClick={() => handleIncreaseQuantityAdminMenu(index)}
                          sx={{ flex: "none" }}
                        >
                          +
                        </IconButton>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleAddProduct(index);
                        }}
                      >
                        Thêm
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
