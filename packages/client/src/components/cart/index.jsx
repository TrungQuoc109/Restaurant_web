// ShoppingCartModel.jsx
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { MdOutlineShoppingCart } from "react-icons/md";

const ShoppingCartModel = ({ open, handleClose }) => {
  // Sample shopping cart items
  const cartItems = [
    { id: 1, name: "Product 1", price: "$10.00" },
    { id: 2, name: "Product 2", price: "$15.00" },
    { id: 3, name: "Product 3", price: "$20.00" },
  ];

  return (
    <Dialog open={open} onClose={handleClose}>
      {/* Contents of your shopping cart model */}
      <DialogTitle>Shopping Cart</DialogTitle>
      <DialogContent>
        {cartItems.length > 0 ? (
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.name}
                  secondary={`Price: ${item.price}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">Your cart is empty.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        {/* Add checkout or other actions */}
      </DialogActions>
    </Dialog>
  );
};

export default ShoppingCartModel;
