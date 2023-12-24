import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    Grid,
} from "@mui/material";
import ResponsiveAppBar from "../../nav-bar";
import Footer from "../../footer";
import { useMenuContext } from "../../../context/MenuContextProvider";
import { useNavigate, useParams } from "react-router-dom";

function OrderDetail() {
    const [userOrders, setUserOrders] = useState(null);
    const status = ["Đang chờ", "Đang xử lý", "Đang giao", "Đã thanh toán"];
    const { isLoggedIn } = useMenuContext();
    const navigate = useNavigate();
    const token = localStorage.getItem("jwtToken");
    const { orderId, type } = useParams();
    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/order/${orderId}/${type}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status:`);
                }
                const data = await response.json();
                // console.log(data);
                setUserOrders(data);
            } catch (error) {
                console.error("Error fetching order detail:");
            }
        };
        fetchOrderDetail();
    }, [orderId, type, token, isLoggedIn, navigate]);

    return (
        <Grid>
            <ResponsiveAppBar />
            <Container>
                <br />
                <Box sx={{ textAlign: "center" }}>
                    {userOrders && userOrders.order_detail && (
                        <Typography variant="h4">
                            Chi tiết đơn hàng #{userOrders.order_detail.id}
                        </Typography>
                    )}
                    <Divider />
                    <br />

                    {userOrders && userOrders.order_detail && (
                        <Typography variant="h6">
                            Trạng thái: {status[userOrders.order_detail.status]}
                        </Typography>
                    )}
                    {userOrders &&
                        userOrders.order_detail &&
                        userOrders.order_detail &&
                        ((userOrders.order_detail.address && (
                            <Typography variant="h6">
                                Địa chỉ: {userOrders.order_detail.address}
                            </Typography>
                        )) || (
                            <Typography variant="h6">
                                Ngày hẹn:{" "}
                                {userOrders.order_detail.appointment_date}
                                <br />
                                Giờ hẹn:{" "}
                                {userOrders.order_detail.appointment_time}
                            </Typography>
                        ))}
                    {userOrders && userOrders.order_detail && (
                        <Typography variant="h6">
                            Ghi chú: {userOrders.order_detail.note}
                        </Typography>
                    )}
                    {userOrders && userOrders.order_detail && (
                        <Typography variant="h6">
                            Tổng giá: {userOrders.order_detail.totalprice}
                        </Typography>
                    )}
                    <Button
                        variant="outlined"
                        onClick={() => window.history.back()}
                    >
                        Quay lại
                    </Button>
                    <br />
                    <br />
                    <Typography variant="h5">Chi tiết đơn hàng</Typography>
                    <List>
                        {userOrders &&
                            userOrders.order_detail &&
                            userOrders.order_detail.detail.map((item) => (
                                <Grid key={item.id}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <ListItemText
                                                primary={`Tên món: ${item.Item.name}`}
                                                secondary={`Số lượng: ${item.quantity}`}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body1">
                                                {`Giá: ${new Intl.NumberFormat(
                                                    "vi-VN",
                                                    {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }
                                                ).format(item.amount)}`}
                                            </Typography>
                                            <Typography variant="body2">
                                                {`Ghi chú: ${item.note}`}
                                            </Typography>
                                        </Grid>
                                        <Divider />
                                    </Grid>
                                </Grid>
                            ))}
                    </List>
                </Box>
            </Container>
            <Footer />
        </Grid>
    );
}

export default OrderDetail;
