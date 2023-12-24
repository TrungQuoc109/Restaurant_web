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
} from "@mui/material";
import AdminPage from "../adminNav";
import * as jwt_decode from "jwt-decode";

const InvoiceManagementPage = () => {
    const [invoices, setInvoices] = useState([]);
    const token = localStorage.getItem("jwtToken");
    const navigate = useNavigate();

    const status = ["Đang chờ", "Đang xử lý", "Đang giao"];
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/admin/orders",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error!`);
                }
                const data = await response.json();
                //  console.log(data);
                setInvoices(data);
            } catch (error) {
                console.error("Error fetching orders:");
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
        } else navigate("/");
    }, []);

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
                                <TableCell>Status</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>{invoice.id}</TableCell>
                                    <TableCell>
                                        {invoice["Customer.name"]}
                                    </TableCell>
                                    <TableCell>{invoice.totalprice}</TableCell>
                                    <TableCell>
                                        {status[invoice.status]}
                                    </TableCell>
                                    <TableCell>{invoice.order_type}</TableCell>
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
                                            onClick={() =>
                                                handleDelete(invoice.id)
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
            </Container>
        </Grid>
    );
};

export default InvoiceManagementPage;
