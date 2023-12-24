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

    const handleSubmitWithMenu = (event) => {
        event.preventDefault();
        if (orderedProducts.length > 0) {
            console.log("Form submitted!");
            // Thêm phần xử lý khi submit ở đây
        } else {
            console.log("Không có sản phẩm trong danh sách. Không thể đặt!");
            // Hiển thị thông báo hoặc thực hiện hành động khác nếu không có sản phẩm nào trong danh sách
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
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
                        <form onSubmit={handleSubmit}>
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
                                            name="specialRequests"
                                            label="Yêu cầu đặt biệt"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            variant="standard"
                                        />
                                    </Grid>
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
                                </Grid>
                            </Container>
                        </form>
                    </Grid>
                )}
                {selectedTab === 1 && (
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <form onSubmit={handleSubmitWithMenu}>
                                <Container
                                    maxWidth="lg"
                                    sx={{
                                        backgroundColor: "White",
                                        mt: "1rem",
                                    }}
                                >
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
                                                label="Số điện thoại"
                                                fullWidth
                                                autoComplete="tel"
                                                variant="standard"
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
                                                name="numberOfGuests"
                                                fullWidth
                                                variant="standard"
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
                                                name="specialRequests"
                                                label="Yêu cầu đặt biệt"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                variant="standard"
                                            />
                                        </Grid>
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
                                    </Grid>
                                </Container>
                            </form>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" gutterBottom>
                                        Danh sách sản phẩm đã đặt
                                    </Typography>
                                    <Grid item xs={12} sx={{ mb: "1rem" }}>
                                        <Typography variant="h6">
                                            Tổng: ${calculateTotalPrice()} đ
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
                                                                product.image
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
                                                                {product.name}
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
                                                                    Giá:{" "}
                                                                    {
                                                                        product.price
                                                                    }{" "}
                                                                    đ
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
                                                                    Số lượng:
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
            </Container>
            <Footer />
        </Grid>
    );
}

export default BookingTablePage;
