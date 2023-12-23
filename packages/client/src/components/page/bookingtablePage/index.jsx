import React, { useState } from "react";
import {
    Container,
    Grid,
    Button,
    Select,
    MenuItem,
    Typography,
    TextField,
    InputLabel,
    Tabs,
    Tab,
} from "@mui/material";
import ResponsiveAppBar from "../../nav-bar";
import Footer from "../../footer";

function BookingTablePage() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [formData, setFormData] = useState({
        appointment_date: "",
        appointment_time: "",
        number_of_guests: 1,
        note: "",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const token = localStorage.getItem("jwtToken");
    const handleSubmit = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/customer/reservation/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("order_id", data.order.id);
                console.log("Đặt bàn thành công!", data.order.id);
            } else {
                const errorData = await response.json();
                console.log(errorData.message);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
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

    const todayDate = new Date().toISOString().split("T")[0];

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 14);
    const twoWeeksLater = futureDate.toISOString().split("T")[0];

    return (
        <Grid>
            <ResponsiveAppBar />
            <Container
                maxWidth="lg"
                sx={{ backgroundColor: "White", mt: "5rem" }}
            >
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="booking tabs"
                    sx={{ marginBottom: "1rem" }}
                >
                    <Tab label="Đặt bàn" />
                </Tabs>
                {selectedTab === 0 && (
                    <Grid container spacing={3}>
                        <Container
                            maxWidth="lg"
                            sx={{ backgroundColor: "White", mt: "1rem" }}
                        >
                            <br />
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="bookingDate"
                                        name="appointment_date"
                                        label="Ngày đặt"
                                        fullWidth
                                        type="date"
                                        variant="standard" // Thay đổi variant thành "outlined"
                                        value={formData.appointment_date}
                                        onChange={handleInputChange}
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
                                        <Typography variant="body2">
                                            Khung giờ
                                        </Typography>
                                    </InputLabel>
                                    <Select
                                        required
                                        labelId="bookingTime-label"
                                        id="bookingTime"
                                        name="appointment_time"
                                        fullWidth
                                        variant="standard"
                                        value={
                                            formData.appointment_time ||
                                            bookingTimeOptions[0]
                                        }
                                        onChange={handleInputChange}
                                    >
                                        {bookingTimeOptions.map(
                                            (timeOption) => (
                                                <MenuItem
                                                    key={timeOption}
                                                    value={timeOption}
                                                >
                                                    {timeOption}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel id="numberOfGuests-label">
                                        <Typography variant="body2">
                                            Số lượng khách
                                        </Typography>
                                    </InputLabel>
                                    <Select
                                        required
                                        labelId="numberOfGuests-label"
                                        id="numberOfGuests"
                                        name="number_of_guests"
                                        fullWidth
                                        variant="standard"
                                        value={formData.number_of_guests}
                                        onChange={handleInputChange}
                                        defaultValue={1}
                                    >
                                        {numberOfGuestsOptions.map((option) => (
                                            <MenuItem
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="specialRequests"
                                        name="note"
                                        label="Yêu cầu đặt biệt"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        variant="standard"
                                        value={formData.note}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        sx={{ mb: "1rem" }}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                    >
                                        Đặt bàn ngay
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                )}
            </Container>
            <Footer />
        </Grid>
    );
}

export default BookingTablePage;
