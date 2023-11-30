import React from "react";
import { Typography, Box, Container, Grid, IconButton } from "@mui/material";
import { AiFillFacebook } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";

const footerStyle = {
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#f0f0f0",
  padding: "1rem",
  mt: 1,
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
        © {new Date().getFullYear()} Your Website Name
      </Typography>
    </Box>
  );
}

export default Footer;
