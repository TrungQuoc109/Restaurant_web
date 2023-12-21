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
} from "@mui/material";
import AdminPage from "../adminNav";
const InvoiceManagementPage = () => {
  const [invoices, setInvoices] = useState([
    { id: 1, customer: "Customer A", total: 100 },
    { id: 2, customer: "Customer B", total: 150 },
  ]);

  const handleDelete = (id) => {
    setInvoices((prevInvoices) =>
      prevInvoices.filter((invoice) => invoice.id !== id)
    );
  };

  return (
    <Grid>
      <AdminPage />
      <Container>
        <br />
        <Typography variant="h5">Invoice Management</Typography>
        <br />
        <Button
          component={Link}
          to="/invoices/add"
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
        >
          Add Invoice
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.total}</TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/invoices/edit/${invoice.id}`}
                      variant="outlined"
                      color="primary"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(invoice.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Grid>
  );
};

export default InvoiceManagementPage;
