import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Grid,
    Typography,
    Button,
    Container,
    Avatar,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import ResponsiveAppBar from "../../nav-bar";
import Footer from "../../footer";

function UserPage() {
    const [userData, setUserData] = useState({
        id: "",
        username: "",
        phone: "",
    });
    const [userOrders, setUserOrders] = useState([]);

    const token = localStorage.getItem("jwtToken");
    const status = ["Đang chờ", "Đang xử lý", "Đang giao"];
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:8080/customer", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData({
                        id: data.id,
                        username: data.name,
                        phone: data.phone,
                    });
                    try {
                        const response = await fetch(
                            `http://localhost:8080/order/${data.id}`,
                            {
                                method: "GET",
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                        if (response.ok) {
                            const data = await response.json();
                            setUserOrders(data);
                            // console.log(data);
                        } else {
                            console.error("Error fetching user orders");
                        }
                    } catch (error) {
                        console.error("Error fetching user orders:");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);
    const handleDeleteOrder = async (orderId, type) => {
        try {
            const response = await fetch(
                `http://localhost:8080/order/${orderId}/${type}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                // Filter out the deleted order from the userOrders state
                setUserOrders((prevOrders) =>
                    prevOrders.filter((order) => order.id !== orderId)
                );
                // console.log(Order with ID ${orderId} deleted successfully.);
            } else {
                console.error(`Failed to delete order with ID ${orderId}.`);
            }
        } catch (error) {
            console.error(`Error deleting order with ID ${orderId}:`, error);
        }
    };
    return (
        <Grid>
            <ResponsiveAppBar />
            <br />
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <Box sx={{ textAlign: "left" }}>
                            <Typography variant="h4">
                                Thông tin người dùng
                            </Typography>
                            <Divider />
                            <br />
                            <Typography variant="h6">
                                Tên người dùng: {userData.username}
                            </Typography>
                            <Typography variant="h6">
                                Phone: {userData.phone}
                            </Typography>
                            <br />
                            <Grid item xs={12} textAlign="left">
                                <Button
                                    component={Link}
                                    to="/"
                                    variant="outlined"
                                >
                                    Quay lại trang chủ
                                </Button>
                                <Button
                                    sx={{ ml: "1rem" }}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        window.location.href = "/login";
                                    }}
                                >
                                    Đăng xuất
                                </Button>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h4">
                                Theo dõi Đơn hàng
                            </Typography>
                            <Divider />
                            {userOrders && (
                                <List>
                                    {userOrders.map((order) => (
                                        <ListItem key={order.id}>
                                            <ListItemText
                                                primary={`Đơn hàng #${order.id} | Ngày đặt: ${order.order_date}`}
                                                secondary={`Trạng thái: ${
                                                    status[order.status]
                                                }`}
                                            />
                                            <Button
                                                variant="outlined"
                                                component={Link}
                                                to={`/order/${order.id}/${order.order_type}`}
                                            >
                                                Xem chi tiết
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{ ml: 1 }}
                                                onClick={() =>
                                                    handleDeleteOrder(
                                                        order.id,
                                                        order.order_type
                                                    )
                                                }
                                            >
                                                Xóa đơn
                                            </Button>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Grid>
    );
}

export default UserPage;
