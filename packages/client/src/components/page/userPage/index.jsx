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
import ResponsiveAppBar from "../../Nav-bar";
import Footer from "../../footer";
import { useMenuContext } from "../../../context/MenuContextProvider";
function UserPage() {
    const { isLoggedIn, handleLogout } = useMenuContext();
    const [userData, setUserData] = useState({
        username: "",
        phone: "",
    });
    const [userOrders, setUserOrders] = useState([]);

    const token = localStorage.getItem("jwtToken");
    const status = ["Đang chờ", "Đang xử lý", "Đang giao"];
    useEffect(() => {
        // Gọi API để lấy thông tin người dùng và đơn hàng
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/customer/",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setUserData({
                        username: data.name,
                        phone: data.phone,
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        const fetchUserOrders = async () => {
            try {
                const response = await fetch("http://localhost:8080/order/", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserOrders(data);
                } else {
                    console.error("Error fetching user orders");
                }
            } catch (error) {
                console.error("Error fetching user orders:");
            }
        };

        fetchUserData();
        fetchUserOrders();
    }, []);

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
                                        handleLogout();
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
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Grid>
    );
}

export default UserPage;
