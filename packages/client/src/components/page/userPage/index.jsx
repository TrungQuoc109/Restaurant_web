import React from "react";
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

  // Điều chỉnh hoặc thay thế dữ liệu người dùng sau này
  const userData = {
    username: "Khoa",
    email: "Khoa@gmail.com",
  };

  const userOrders = [
    { id: 1, status: "Chờ xử lý" },
    { id: 2, status: "Đang xử lý" },
    { id: 3, status: "Đã xử lý" },
  ];

  return (
    <Grid>
      <ResponsiveAppBar />
      <br />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="h4">Thông tin người dùng</Typography>
              <Divider />
              <br />
              <Typography variant="h6">
                Tên người dùng: {userData.username}
              </Typography>
              <Typography variant="h6">Email: {userData.email}</Typography>
              <br />
              <Grid item xs={12} textAlign="left">
                <Button component={Link} to="/" variant="outlined">
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
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4">Theo dõi Đơn hàng</Typography>
              <Divider />
              <List>
                {userOrders.map((order) => (
                  <ListItem key={order.id}>
                    <ListItemText
                      primary={`Đơn hàng #${order.id}`}
                      secondary={`Trạng thái: ${order.status}`}
                    />
                    <Button
                      variant="outlined"
                      component={Link}
                      to={`/orders/${order.id}`}
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
