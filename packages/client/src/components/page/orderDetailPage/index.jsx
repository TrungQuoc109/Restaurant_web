import React from "react";
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

const status = ["Đang chờ", "Đang xử lý", "Đang giao", "Đã thanh toán"];

function OrderDetail() {
  const orderData = {
    id: 123,
    order_date: "2023-12-01",
    status: 3,
    address: "123 Example Street",
    note: "Some notes about the order",
    totalprice: 2500000,
  };

  const orderItemsData = [
    {
      id: 1,
      item_ID: 1,
      quaity: 2,
      amount: 50000,
      note: "Some notes about item 1",
    },
    {
      id: 2,
      item_ID: 2,
      quaity: 1,
      amount: 100000,
      note: "Some notes about item 2",
    },
    // Add more items as needed
  ];

  return (
    <Grid>
      <ResponsiveAppBar />
      <Container>
        <br />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4">
            Chi tiết đơn hàng #{orderData.id}
          </Typography>
          <Divider />
          <br />
          <Typography variant="h6">
            Ngày đặt hàng: {orderData.order_date}
          </Typography>
          <Typography variant="h6">
            Trạng thái: {status[orderData.status]}
          </Typography>
          <Typography variant="h6">Địa chỉ: {orderData.address}</Typography>
          <Typography variant="h6">Ghi chú: {orderData.note}</Typography>
          <Typography variant="h6">Tổng giá: {orderData.totalprice}</Typography>
          <Button variant="outlined" onClick={() => window.history.back()}>
            Quay lại
          </Button>
          <br />
          <br />
          <Typography variant="h5">Chi tiết đơn hàng</Typography>
          <List>
            {orderItemsData.map((item) => (
              <Grid key={item.id}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <ListItemText
                      primary={`Tên món: ${item.item_ID}`}
                      secondary={`Số lượng: ${item.quaity}`}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      {`Giá: ${new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.amount)}`}
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
