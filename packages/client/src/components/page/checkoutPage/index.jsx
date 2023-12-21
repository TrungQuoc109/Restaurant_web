import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Container,
  Divider,
  Box,
  Card,
  CardContent,
  CardMedia,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useMenuContext } from "../../../context/MenuContextProvider";
import ResponsiveAppBar from "../../Nav-bar";
import Footer from "../../footer";

function CheckoutPage() {
  const {
    cartItems,
    totalPrice,
    handleRemoveItem,
    handleUpdateQuantity,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
  } = useMenuContext();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shipMethod, setshipMethod] = useState("");

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleShipMethodChange = (event) => {
    setshipMethod(event.target.value);
  };
  return (
    <Grid>
      <ResponsiveAppBar />
      <Container>
        <Grid container spacing={3} sx={{ marginTop: "2rem" }}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Thông tin thanh toán
              </Typography>
              <Divider />
              <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Địa chỉ người đặt"
                    variant="outlined"
                    value={address}
                    onChange={handleAddressChange}
                    disabled={shipMethod === "SelfPickup"}
                  />
                  {shipMethod === "SelfPickup" && (
                    <Typography
                      variant="body1"
                      sx={{ marginTop: "1rem", ml: "1rem" }}
                    >
                      Địa chỉ: Số 13 Mai Hắc Đế, phường Nguyễn Du, quận Hai Bà
                      Trưng, thành phố Hà Nội
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="payment-method-label">
                      Phương thức thanh toán
                    </InputLabel>
                    <Select
                      labelId="payment-method-label"
                      id="payment-method-select"
                      value={paymentMethod}
                      onChange={handlePaymentMethodChange}
                      label="Phương thức thanh toán"
                    >
                      <MenuItem value="COD">
                        Thanh toán khi nhận hàng (COD)
                      </MenuItem>
                      <MenuItem value="CreditCard">Thẻ tín dụng</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="payment-method-label">
                      Phương thức nhận hàng
                    </InputLabel>
                    <Select
                      labelId="payment-method-label"
                      id="payment-method-select"
                      value={shipMethod}
                      onChange={handleShipMethodChange}
                      label="Phương thức thanh toán"
                    >
                      <MenuItem value="Delivery">Delivery</MenuItem>
                      <MenuItem value="SelfPickup">Self Pick-up</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ghi chú"
                    variant="outlined"
                    multiline
                    rows={4}
                    onChange={""}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Giỏ hàng
              </Typography>
              <Divider />
              <br />
              {cartItems.length === 0 ? (
                <Typography variant="subtitle1" align="center">
                  Giỏ hàng của bạn trống.
                </Typography>
              ) : (
                <Grid container spacing={2}>
                  {cartItems.map((product, index) => (
                    <Grid container item xs={12} key={index}>
                      <Grid item xs={4}>
                        <CardMedia
                          component="img"
                          height="150"
                          src={`data:image/png;base64, ${product.image.imageData}`}
                          alt={product.name}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="h6" sx={{ marginLeft: "8px" }}>
                          {product.name}
                        </Typography>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            display: "flex",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ marginLeft: "8px" }}
                          >
                            Giá: {product.price}
                          </Typography>
                          <Grid container justifyContent="flex-end">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleRemoveItem(index)}
                            >
                              Xóa
                            </Button>
                          </Grid>
                        </Grid>
                        <Typography
                          variant="body2"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Typography sx={{ mt: 1, ml: 1 }}>
                            Số lượng:
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <IconButton
                            onClick={() => handleDecreaseQuantity(index)}
                            sx={{ flex: "none" }}
                          >
                            -
                          </IconButton>
                          <TextField
                            type="number"
                            value={product.quantity}
                            sx={{
                              width: "5rem",
                              height: "1.875rem",
                              mx: "0.5rem",
                              "& input[type='number']": {
                                width: "100%",
                                height: "100%",
                                padding: "0.5rem",
                                borderRadius: "0",
                                "&::-webkit-inner-spin-button": {
                                  "-webkit-appearance": "none",
                                  margin: 0,
                                },
                              },
                            }}
                            onChange={(event) => {
                              const newQuantity = parseInt(
                                event.target.value,
                                10
                              );
                              if (!isNaN(newQuantity)) {
                                handleUpdateQuantity(index, newQuantity);
                              }
                            }}
                          />
                          <IconButton
                            onClick={() => handleIncreaseQuantity(index)}
                            sx={{ flex: "none" }}
                          >
                            +
                          </IconButton>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <br />
                        <Divider />
                      </Grid>
                    </Grid>
                  ))}

                  <Grid item xs={12}>
                    <Typography variant="h6">
                      Tổng cộng: {totalPrice}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                      Thanh toán
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Grid>
  );
}

export default CheckoutPage;
