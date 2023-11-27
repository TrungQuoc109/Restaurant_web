import {
  Container,
  Grid,
  Button,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import ResponsiveAppBar from "../../Nav-bar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import Footer from "../../footer";

function Datbanpage() {
  const handleSubmit = () => {
    console.log("Form submitted!");
  };

  const numberOfGuestsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const bookingTimeOptions = [
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
    "20:15",
    "20:30",
    "20:45",
    "21:00",
    "21:15",
    "21:30",
  ];
  const [selectedTables, setSelectedTables] = useState([]);

  const handleTableChange = (tableNumber) => {
    if (selectedTables.includes(tableNumber)) {
      setSelectedTables(
        selectedTables.filter((table) => table !== tableNumber)
      );
    } else {
      setSelectedTables([...selectedTables, tableNumber]);
    }
  };

  // Create an array representing 10 tables
  const tables = Array.from({ length: 10 }, (_, index) => index + 1);
  const todayDate = new Date().toISOString().split("T")[0];

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 14);
  const twoWeeksLater = futureDate.toISOString().split("T")[0];
  return (
    <Grid>
      <ResponsiveAppBar />
      <Container maxWidth="lg" sx={{ backgroundColor: "White", mt: "1rem" }}>
        <Typography variant="h4" sx={{ pt: "1rem" }} gutterBottom>
          Đặt bàn
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="customerName"
              name="customerName"
              label="Nhập tên của bạn"
              fullWidth
              autoComplete="name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="contactNumber"
              name="contactNumber"
              label="Số điện thoại hoặc email"
              fullWidth
              autoComplete="tel"
              variant="standard"
              inputProps={{ type: "number" }}
              sx={{
                '& input[type="number"]::-webkit-inner-spin-button': {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
                '& input[type="number"]::-webkit-outer-spin-button': {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="contactNumber"
              name="contactNumber"
              label="Số điện thoại hoặc email"
              fullWidth
              autoComplete="tel"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="bookingDate"
              name="bookingDate"
              label="Ngày đặt"
              fullWidth
              type="date"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: todayDate,
                max: twoWeeksLater,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="bookingTime-label">
              <Typography variant="body2">Khung giờ</Typography>
            </InputLabel>
            <Select
              required
              labelId="bookingTime-label"
              id="bookingTime"
              name="bookingTime"
              fullWidth
              variant="standard"
              defaultValue={bookingTimeOptions[0]}
            >
              {bookingTimeOptions.map((timeOption) => (
                <MenuItem key={timeOption} value={timeOption}>
                  {timeOption}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="numberOfGuests-label">
              <Typography variant="body2">Số lượng khách</Typography>
            </InputLabel>
            <Select
              required
              labelId="numberOfGuests-label"
              id="numberOfGuests"
              name="numberOfGuests"
              fullWidth
              variant="standard"
              defaultValue={1}
            >
              {numberOfGuestsOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">Choose Tables:</Typography>
            <Grid container spacing={2}>
              {tables.map((tableNumber) => (
                <Grid item key={tableNumber}>
                  <Checkbox
                    checked={selectedTables.includes(tableNumber)}
                    onChange={() => handleTableChange(tableNumber)}
                    inputProps={{ "aria-label": `Table ${tableNumber}` }}
                  />
                  <Typography variant="body2">{`Table ${tableNumber}`}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="specialRequests"
              name="specialRequests"
              label="Yêu cầu đặt biệt"
              fullWidth
              multiline
              rows={4}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <Button sx={{ mb: "1rem" }} variant="contained" color="primary">
              Đặt bàn ngay
            </Button>
          </Grid>
        </Grid>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </Grid>
  );
}

export default Datbanpage;
