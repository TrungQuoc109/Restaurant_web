import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import jwt from "jsonwebtoken";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [token, setToken] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const saveTokenToLocalStorage = (token) => {
        localStorage.setItem("jwtToken", token);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:8080/account/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                const data = await response.json();

                const mockToken = data.token;
                setToken(mockToken);
                saveTokenToLocalStorage(mockToken);
                const decodedToken = jwt.decode(data.token, { complete: true });
                const userRoles = decodedToken.payload.role;
                if (userRoles) window.location.href = "/";
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("Internal Server Error");
        }
    };

    return (
        <Grid>
            <ResponsiveAppBar />
            <Container maxWidth="xs">
                <Card style={{ marginTop: "5rem", marginBottom: "7rem" }}>
                    <CardContent>
                        <Typography variant="h5" align="center" gutterBottom>
                            Login
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
                                        label="Password"
                                        name="password"
                                        type="password"
                                        variant="outlined"
                                        value={formData.password}
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
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid item xs={12}>
                                <Typography
                                    align="center"
                                    variant="body2"
                                    gutterBottom
                                >
                                    Don't have an account?{" "}
                                    <Link
                                        to="/signup"
                                        style={{
                                            textDecoration: "none",
                                            color: "#29b6f6",
                                        }}
                                    >
                                        Sign Up
                                    </Link>
                                </Typography>
                            </Grid>
                        </form>
                        {errorMessage && errorMessage !== "successful" && (
                            <Typography
                                variant="body2"
                                color="error"
                                align="center"
                            >
                                {errorMessage}
                            </Typography>
                        )}
                        {errorMessage === "successful" && (
                            <Typography
                                variant="body2"
                                color="primary"
                                align="center"
                                style={{ color: "green" }}
                            >
                                {errorMessage}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Container>
            <Footer />
        </Grid>
    );
};

export default LoginPage;
