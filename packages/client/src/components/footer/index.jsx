import React from "react";
import { Typography, Box, Container, Grid, IconButton } from "@mui/material";
import { AiFillFacebook } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

const footerStyle = {
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#f0f0f0",
  padding: "1rem",
  mt: 1,
};
export const linkStyle = {
  textDecoration: "none",
  height: "1.5rem",
  width: "10rem",
  display: "flex",
};
export const footerImageStyle = {
  height: "8rem",
  width: "8rem",
};

function Footer() {
  return (
    <Box sx={footerStyle}>
      <Container>
        <Grid container>
          <Grid item md={8}>
            <Typography variant="body1" color="text.secondary">
              <img src="/public/image/logo.webp" style={{ height: "5rem" }} />
              <br />
              CÔNG TY TNHH ĐẦU TƯ THƯƠNG MẠI PHƯƠNG VY <br />
              Nhà hàng Phương Nam - Món ngon miền Nam <br />
              Địa chỉ: Số 13 Mai Hắc Đế, phường Nguyễn Du, quận Hai Bà Trưng,
              thành phố Hà Nội <br />
              MST: 0107832547 <br />
              Ngày cấp: 19/05/2020 <br />
              Nơi cấp: Sở kế hoạch và Đầu tư thành phố Hà Nội
              <br />
              <br />
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography variant="body1" sx={{ color: "#a80e0e" }}>
              Nhà hàng Phương Nam, món ngon miền Nam
              <br />
              <img
                src="/public/image/produce/com_chay_kho_quet__1__66813257e166432da044c6894b36da68_medium.jpg"
                alt="Your Image"
                style={footerImageStyle}
              />
              <img
                src="/public/image/produce/lau_ca_keo__2__cf8deed9ec9d45249d9fc76051e37401_medium.jpg"
                alt="Your Image"
                style={footerImageStyle}
              />
              <img
                src="/public/image/produce/lau_ga_la_giang_a704ccce60ba40da80df0e6e376f4867_medium.jpg"
                alt="Your Image"
                style={footerImageStyle}
              />
            </Typography>
            <Typography variant="body1">
              <strong>Các trang khác</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Link to="/" style={linkStyle}>
                Trang chủ
              </Link>
              <Link to="/menuPage" style={linkStyle}>
                Menu
              </Link>
              <Link to="/restaurantInfo" style={linkStyle}>
                Thông tin nhà hàng
              </Link>
              <Link to="/BookingTablePage" style={linkStyle}>
                Đặt bàn
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              <strong>CONTACT US</strong>
              <br />
              <IconButton>
                <AiFillFacebook style={{ fontSize: "2rem" }} />
              </IconButton>
              <IconButton>
                <BsInstagram style={{ fontSize: "2rem" }} />
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ textAlign: "center" }}
      >
        © {new Date().getFullYear()} Nhà Hành Phương Nam
      </Typography>
    </Box>
  );
}

export default Footer;
