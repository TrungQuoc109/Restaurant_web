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

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    const handleInputChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const handleSubmit = () => {
        console.log(formData);
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
    const [formData, setFormData] = useState({
        customerName: "",
        contactNumber: "",
        appointment_date: "",
        bookingDate: "",
        appointment_time: bookingTimeOptions[0],
        number_of_guests: 1,
        note: "",
    });

    const todayDate = new Date().toISOString().split("T")[0];
    const futureDate = new Date();

    futureDate.setDate(futureDate.getDate() + 14);
    const twoWeeksLater = futureDate.toISOString().split("T")[0];

    return (
        <Grid>
            <ResponsiveAppBar />
            <Container
                maxWidth="lg" /*  */
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
                    <Tab label="Danh sách món" />
                </Tabs>
                {selectedTab === 0 && (
                    <Grid container spacing={3}>
                        <Container
                            maxWidth="lg"
                            sx={{ backgroundColor: "White", mt: "1rem" }}
                        >
                            <br />
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
                                        value={formData.customerName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "customerName",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="contactNumber"
                                        name="contactNumber"
                                        label="Số điện thoại"
                                        fullWidth
                                        autoComplete="tel"
                                        variant="standard"
                                        value={formData.contactNumber}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "contactNumber",
                                                e.target.value
                                            )
                                        }
                                        inputProps={{ type: "number" }}
                                        sx={{
                                            '& input[type="number"]::-webkit-inner-spin-button':
                                                {
                                                    "-webkit-appearance":
                                                        "none",
                                                    margin: 0,
                                                },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="bookingDate"
                                        name="bookingDate"
                                        label="Ngày đặt"
                                        fullWidth
                                        type="date"
                                        variant="standard"
                                        value={formData.appointment_date}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "bookingDate",
                                                e.target.value
                                            )
                                        }
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
                                        name="bookingTime"
                                        fullWidth
                                        variant="standard"
                                        defaultValue={bookingTimeOptions[0]}
                                        value={formData.appointment_time}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "bookingTime",
                                                e.target.value
                                            )
                                        }
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
                                        name="numberOfGuests"
                                        fullWidth
                                        variant="standard"
                                        value={formData.number_of_guests}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "numberOfGuests",
                                                e.target.value
                                            )
                                        }
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
                                        name="specialRequests"
                                        label="Yêu cầu đặt biệt"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        variant="standard"
                                        value={formData.note}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "specialRequests",
                                                e.target.value
                                            )
                                        }
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
                {selectedTab === 1 && (
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}></Grid>
                    </Grid>
                )}
            </Container>
            <Footer />
        </Grid>
    );
}

export default BookingTablePage;
