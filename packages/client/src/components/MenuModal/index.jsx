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

const ProductModal = ({ open, onClose, handleAddProduct }) => {
  const { products } = useMenuContext();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Menu</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={20}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Tên món</TableCell>
                  <TableCell>Giá</TableCell>
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
