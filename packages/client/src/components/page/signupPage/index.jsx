import React, { useState } from "react";
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
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted with:", formData);
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
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    value={formData.email}
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
                </Grid>
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
