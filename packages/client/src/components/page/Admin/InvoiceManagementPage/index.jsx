import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
} from "@mui/material";
import AdminPage from "../adminNav";
import * as jwt_decode from "jwt-decode";
import ProductModal from "../../../MenuModal";
import { useMenuContext } from "../../../../context/MenuContextProvider";

const dummyTakeoutOrderDetails = [
  {
    id: 1,
    order_ID: 9,
    item_ID: 1,
    quantity: 1,
    amount: 398000.0,
  },
  {
    id: 2,
    order_ID: 9,
    item_ID: 2,
    quantity: 2,
    amount: 796000.0,
  },
  {
    id: 3,
    order_ID: 9,
    item_ID: 3,
    quantity: 3,
    amount: 1800000.0,
  },
  {
    id: 4,
    order_ID: 10,
    item_ID: 3,
    quantity: 3,
    amount: 1800000.0,
  },
];

const InvoiceManagementPage = () => {
  const { products } = useMenuContext();
  const [invoices, setInvoices] = useState([]);
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const [expandedInvoiceId, setExpandedInvoiceId] = useState(null);

  //dummy
  const [takeoutOrderDetails, setTakeoutOrderDetails] = useState(
    dummyTakeoutOrderDetails
  );

  const handleToggleExpansion = (id) => {
    setExpandedInvoiceId((prevId) => (prevId === id ? null : id));
  };

  const status = ["Đang chờ", "Đang xử lý", "Đang giao"];
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error!`);
        }
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    if (token) {
      const decodedToken = jwt_decode.jwtDecode(token);
      const roles = decodedToken.role;
      if (roles) {
        fetchOrders();
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  const handleDelete = (detailId, invoiceId) => {
    const updatedDetails = takeoutOrderDetails.filter(
      (detail) => detail.id !== detailId || detail.order_ID !== invoiceId
    );
    setTakeoutOrderDetails(updatedDetails);
  };

  const handleDeleteInvoice = (id) => {
    setInvoices((prevInvoices) =>
      prevInvoices.filter((invoice) => invoice.id !== id)
    );
  };

  const handleSave = () => {
    const updatedDetails = takeoutOrderDetails.filter(
      (detail) => detail.order_ID === expandedInvoiceId
    );

    const updatedInvoice = invoices.find(
      (invoice) => invoice.id === expandedInvoiceId
    );

    console.log("Updated Details:", updatedDetails);
    console.log("Updated Invoice:", updatedInvoice);
    setExpandedInvoiceId(null);
  };

  const [productModalOpen, setProductModalOpen] = useState(false);

  const handleOpenProductModal = () => {
    setProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setProductModalOpen(false);
  };

  const handleStatusChange = (event, invoiceId) => {
    const selectedStatus = event.target.value;

    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === invoiceId
        ? { ...invoice, status: selectedStatus }
        : invoice
    );

    setInvoices(updatedInvoices);
  };

  const handleAddProduct = (productId) => {
    const selectedProduct = products[productId];
    const existingDetailIndex = takeoutOrderDetails.findIndex(
      (detail) =>
        detail.order_ID === expandedInvoiceId &&
        detail.item_ID === selectedProduct.id
    );

    if (existingDetailIndex !== -1) {
      const updatedDetails = [...takeoutOrderDetails];
      const existingDetail = updatedDetails[existingDetailIndex];
      const updatedQuantity = existingDetail.quantity + 1;
      const updatedAmount = selectedProduct.price * updatedQuantity;

      updatedDetails[existingDetailIndex] = {
        ...existingDetail,
        quantity: updatedQuantity,
        amount: updatedAmount,
      };

      setTakeoutOrderDetails(updatedDetails);
    } else {
      const newDetail = {
        id: takeoutOrderDetails.length + 1,
        order_ID: expandedInvoiceId,
        item_ID: selectedProduct.id,
        quantity: 1,
        amount: selectedProduct.price,
      };

      setTakeoutOrderDetails([...takeoutOrderDetails, newDetail]);
    }

    handleCloseProductModal();
  };

  const handleQuantityChange = (detailId, action) => {
    const updatedDetails = takeoutOrderDetails.map((detail) => {
      if (detail.id === detailId) {
        let updatedQuantity = detail.quantity;
        if (action === "increase") {
          updatedQuantity += 1;
        } else if (action === "decrease" && updatedQuantity > 1) {
          updatedQuantity -= 1;
        }
        return {
          ...detail,
          quantity: updatedQuantity,
        };
      }
      return detail;
    });

    setTakeoutOrderDetails(updatedDetails);
  };
  //

  return (
    <Grid>
      <AdminPage />
      <Container>
        <br />
        <Typography variant="h5">Invoice Management</Typography>
        <br />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <React.Fragment key={invoice.id}>
                  <TableRow>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice["Customer.name"]}</TableCell>
                    <TableCell>
                      {" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(invoice.totalprice)}
                    </TableCell>
                    <TableCell>
                      {expandedInvoiceId === invoice.id ? (
                        <Select
                          value={invoice.status}
                          onChange={(e) => handleStatusChange(e, invoice.id)}
                        >
                          {status.map((value, index) => (
                            <MenuItem key={index} value={index}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        status[invoice.status]
                      )}
                    </TableCell>
                    <TableCell>{invoice.order_type}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteInvoice(invoice.id)}
                      >
                        Delete
                      </Button>

                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleToggleExpansion(invoice.id)}
                      >
                        {expandedInvoiceId === invoice.id ? "Hide" : "Edit"}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedInvoiceId === invoice.id && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <TableContainer>
                          <Grid item>
                            <Button
                              variant="outlined"
                              color="success"
                              onClick={() => handleOpenProductModal()}
                            >
                              Thêm món
                            </Button>
                            <ProductModal
                              open={productModalOpen}
                              onClose={handleCloseProductModal}
                              handleAddProduct={handleAddProduct}
                              products={products}
                            />
                            <Button
                              variant="outlined"
                              color="primary"
                              sx={{ ml: 1 }}
                              onClick={handleSave}
                            >
                              Save
                            </Button>
                          </Grid>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Item ID</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Action</TableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              {takeoutOrderDetails
                                .filter(
                                  (detail) =>
                                    detail.order_ID === expandedInvoiceId
                                )
                                .map((detail) => (
                                  <TableRow key={detail.id}>
                                    <TableCell>{detail.item_ID}</TableCell>
                                    <TableCell>
                                      <Grid
                                        container
                                        spacing={2}
                                        alignItems="center"
                                      >
                                        <Grid item>
                                          <IconButton
                                            onClick={() =>
                                              handleQuantityChange(
                                                detail.id,
                                                "decrease"
                                              )
                                            }
                                            color="primary"
                                          >
                                            -
                                          </IconButton>
                                        </Grid>
                                        <Grid item>
                                          <TextField
                                            type="number"
                                            value={detail.quantity}
                                            onChange={(e) =>
                                              handleQuantityChange(e, detail.id)
                                            }
                                            sx={{
                                              width: "5rem",
                                              height: "1.875rem",
                                              mx: "0.5rem",
                                              "& input[type='number']": {
                                                width: "100%",
                                                height: "100%",
                                                padding: "0.5rem",
                                                borderRadius: "0",
                                                "&::-webkit-inner-spin-button":
                                                  {
                                                    "-webkit-appearance":
                                                      "none",
                                                    margin: 0,
                                                  },
                                              },
                                            }}
                                          />
                                        </Grid>
                                        <Grid item>
                                          {" "}
                                          <IconButton
                                            onClick={() =>
                                              handleQuantityChange(
                                                detail.id,
                                                "increase"
                                              )
                                            }
                                            color="primary"
                                          >
                                            +
                                          </IconButton>
                                        </Grid>
                                      </Grid>
                                    </TableCell>
                                    <TableCell>
                                      {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(detail.amount)}
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() =>
                                          handleDelete(
                                            detail.id,
                                            expandedInvoiceId
                                          )
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
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Grid>
  );
};

export default InvoiceManagementPage;
