import React, { useState, useEffect } from "react";
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
    IconButton,
    Divider,
    CardMedia,
    FormControl,
    FormGroup,
} from "@mui/material";
import ResponsiveAppBar from "../../nav-bar";
import Footer from "../../footer";
import { useMenuContext } from "../../../context/MenuContextProvider";
function BookingTablePage() {
    const {
        orderedProducts,
        handleRemoveItem,
        handleUpdateQuantity,
        handleDecreaseQuantity,
        handleIncreaseQuantity,
        handleTabChange,
        selectedTab,
        calculateTotalPrice,
        setSelectedTab,
    } = useMenuContext();
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
    const [detail, setDetail] = useState({});
    const token = localStorage.getItem("jwtToken");
    const [errorMessage, setErrorMessage] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        selectedTab
            ? setDetail({
                  ...formData,
                  item: orderedProducts,
              })
            : setDetail({
                  ...formData,
              });
        const fetchReservationOrder = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/customer/reservation",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(detail),
                    }
                );

                const data = await response.json();

                setErrorMessage({
                    status: response.status,
                    message: data.message,
                });
            } catch (error) {
                console.error("Error fetching check out", error);
            }
        };
        fetchReservationOrder();
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

    useEffect(() => {
        setSelectedTab(0);
    }, []);

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
                <form onSubmit={handleSubmit}>
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
                        <Tab label="Đặt bàn + món" />
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
                                            variant="standard"
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
                                            onChange={handleInputChange}
                                            defaultValue={bookingTimeOptions[0]}
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
                                            defaultValue={1}
                                            onChange={handleInputChange}
                                        >
                                            {numberOfGuestsOptions.map(
                                                (option) => (
                                                    <MenuItem
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </MenuItem>
                                                )
                                            )}
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
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    )}
                    {selectedTab === 1 && (
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Container
                                    maxWidth="lg"
                                    sx={{
                                        backgroundColor: "White",
                                        mt: "1rem",
                                    }}
                                >
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="bookingDate"
                                                name="appointment_date"
                                                label="Ngày đặt"
                                                fullWidth
                                                type="date"
                                                variant="standard"
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
                                                onChange={handleInputChange}
                                                defaultValue={
                                                    bookingTimeOptions[0]
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
                                                name="number_of_guests"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleInputChange}
                                                defaultValue={1}
                                            >
                                                {numberOfGuestsOptions.map(
                                                    (option) => (
                                                        <MenuItem
                                                            key={option}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </MenuItem>
                                                    )
                                                )}
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
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" gutterBottom>
                                            Danh sách sản phẩm đã đặt
                                        </Typography>
                                        <Grid item xs={12} sx={{ mb: "1rem" }}>
                                            <Typography variant="h6">
                                                Tổng:{" "}
                                                {new Intl.NumberFormat(
                                                    "vi-VN",
                                                    {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }
                                                ).format(calculateTotalPrice())}
                                                <Divider />
                                            </Typography>
                                        </Grid>
                                        {orderedProducts.length === 0 ? (
                                            <Typography
                                                variant="subtitle1"
                                                align="center"
                                            >
                                                Danh sách của bạn trống.
                                            </Typography>
                                        ) : (
                                            <Grid container spacing={2}>
                                                {orderedProducts.map(
                                                    (product, index) => (
                                                        <Grid
                                                            container
                                                            item
                                                            xs={12}
                                                            key={index}
                                                        >
                                                            <Grid item xs={4}>
                                                                {product.image &&
                                                                    product
                                                                        .image
                                                                        .imageData && (
                                                                        <CardMedia
                                                                            component="img"
                                                                            height="180"
                                                                            src={`data:image/png;base64, ${product.image.imageData}`}
                                                                            alt={
                                                                                product.name
                                                                            }
                                                                        />
                                                                    )}
                                                            </Grid>
                                                            <Grid item xs={8}>
                                                                <Typography
                                                                    variant="h6"
                                                                    sx={{
                                                                        marginLeft:
                                                                            "8px",
                                                                    }}
                                                                >
                                                                    {
                                                                        product.name
                                                                    }
                                                                </Typography>
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    sx={{
                                                                        display:
                                                                            "flex",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            marginLeft:
                                                                                "8px",
                                                                        }}
                                                                    >
                                                                        Giá:
                                                                        {new Intl.NumberFormat(
                                                                            "vi-VN",
                                                                            {
                                                                                style: "currency",
                                                                                currency:
                                                                                    "VND",
                                                                            }
                                                                        ).format(
                                                                            product.price
                                                                        )}
                                                                    </Typography>
                                                                    <Grid
                                                                        container
                                                                        justifyContent="flex-end"
                                                                    >
                                                                        <Button
                                                                            variant="contained"
                                                                            color="error"
                                                                            onClick={() =>
                                                                                handleRemoveItem(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            Xóa
                                                                        </Button>
                                                                    </Grid>
                                                                </Grid>
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        sx={{
                                                                            mt: 1,
                                                                            ml: 1,
                                                                        }}
                                                                    >
                                                                        Số
                                                                        lượng:
                                                                    </Typography>
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <IconButton
                                                                        onClick={() =>
                                                                            handleDecreaseQuantity(
                                                                                index
                                                                            )
                                                                        }
                                                                        sx={{
                                                                            flex: "none",
                                                                        }}
                                                                    >
                                                                        -
                                                                    </IconButton>
                                                                    <TextField
                                                                        type="number"
                                                                        value={
                                                                            product.quantity
                                                                        }
                                                                        sx={{
                                                                            width: "5rem",
                                                                            height: "1.875rem",
                                                                            mx: "0.5rem",
                                                                            "& input[type='number']":
                                                                                {
                                                                                    width: "100%",
                                                                                    height: "100%",
                                                                                    padding:
                                                                                        "0.5rem",
                                                                                    borderRadius:
                                                                                        "0",
                                                                                    "&::-webkit-inner-spin-button":
                                                                                        {
                                                                                            "-webkit-appearance":
                                                                                                "none",
                                                                                            margin: 0,
                                                                                        },
                                                                                },
                                                                        }}
                                                                        onChange={(
                                                                            event
                                                                        ) => {
                                                                            const newQuantity =
                                                                                parseInt(
                                                                                    event
                                                                                        .target
                                                                                        .value,
                                                                                    10
                                                                                );
                                                                            if (
                                                                                !isNaN(
                                                                                    newQuantity
                                                                                )
                                                                            ) {
                                                                                handleUpdateQuantity(
                                                                                    index,
                                                                                    newQuantity
                                                                                );
                                                                            }
                                                                        }}
                                                                    />
                                                                    <IconButton
                                                                        onClick={() =>
                                                                            handleIncreaseQuantity(
                                                                                index
                                                                            )
                                                                        }
                                                                        sx={{
                                                                            flex: "none",
                                                                        }}
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
                                                    )
                                                )}
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    <br />
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            sx={{ mb: "1rem" }}
                            variant="contained"
                            color="primary"
                        >
                            Đặt bàn ngay
                        </Button>
                    </Grid>
                </form>
                {errorMessage && errorMessage.status !== 200 && (
                    <Typography variant="body2" color="error" align="center">
                        {errorMessage.message}
                    </Typography>
                )}
                {errorMessage && errorMessage.status === 200 && (
                    <Typography
                        variant="body2"
                        color="primary"
                        align="center"
                        style={{ color: "green" }}
                    >
                        {errorMessage.message}
                    </Typography>
                )}
            </Container>
            <Footer />
        </Grid>
    );
}

export default BookingTablePage;
