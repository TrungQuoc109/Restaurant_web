import React, { useEffect, useState } from "react";
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
const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("jwtToken");
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/admin/getCustomer",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []); // Chạy
    const handleDelete = async (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        try {
            const response = await fetch(
                `http://localhost:8080/admin/deleteCustomer/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <Grid>
            <AdminPage />
            <Container>
                <Typography
                    variant="h5"
                    sx={{ marginTop: "20px", marginBottom: "20px" }}
                >
                    User Management
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Họ tên</TableCell>
                                <TableCell>Số điện thoại</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() =>
                                                handleDelete(user.id)
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

export default UserManagementPage;
