import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Container,
    Grid,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
} from "@mui/material";
import ResponsiveAppBar from "../../Nav-bar";
import Footer from "../../footer";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        fullname: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [token, setToken] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const saveTokenToLocalStorage = (token) => {
        localStorage.setItem("jwtToken", token);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Gọi API register từ server
            const response = await fetch(
                "http://localhost:8080/account/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password,
                        name: formData.fullname,
                        phone: formData.phone,
                    }),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                if (response.status === 400) {
                    // const dataerror = await response.json();
                    //console.log(dataerror);
                    setErrorMessage(data.message);
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } else {
                setErrorMessage(null); // Clear any previous error messages
                setSuccessMessage(data.message); // Set success message received from the server
                setToken(data.token);
                saveTokenToLocalStorage(data.token);
                navigate("/login");
            }

            //chuyên trang
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <Grid>
            <ResponsiveAppBar />
            <Container maxWidth="xs">
                <Card style={{ marginTop: "5rem", marginBottom: "5rem" }}>
                    <CardContent>
                        <Typography variant="h5" align="center" gutterBottom>
                            Sign Up
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        name="username"
                                        variant="outlined"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Fullname"
                                        name="fullname"
                                        variant="outlined"
                                        value={formData.fullname}
                                        onChange={handleInputChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        name="phone"
                                        type="phone"
                                        variant="outlined"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        variant="outlined"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        variant="outlined"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                    >
                                        Sign Up
                                    </Button>
                                    {errorMessage ? (
                                        <Typography
                                            color="error"
                                            variant="body2"
                                        >
                                            {errorMessage}
                                        </Typography>
                                    ) : (
                                        successMessage && (
                                            <Typography
                                                style={{ color: "#4caf50" }}
                                                variant="body2"
                                            >
                                                {successMessage}
                                            </Typography>
                                        )
                                    )}
                                </Grid>
                            </Grid>
                            <br />
                            <Grid item xs={12}>
                                <Typography
                                    align="center"
                                    variant="body2"
                                    gutterBottom
                                >
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        style={{
                                            textDecoration: "none",
                                            color: "#29b6f6",
                                        }}
                                    >
                                        Back to Login
                                    </Link>
                                </Typography>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>
            <Footer />
        </Grid>
    );
};

export default SignUpPage;
