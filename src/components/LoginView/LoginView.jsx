import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import "./LoginView.scss";

const LoginView = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://donkey-archive-af41e8314602.herokuapp.com/api/auth/login",
        {
          Username: username,
          Password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:1234",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setLoggedIn(true);
        setSuccess("Login successful! You are now logged in.");
        setError(""); // Clear any previous errors
      } else {
        setError("Login failed. Please check your credentials and try again.");
        setSuccess(""); // Clear any previous success message
      }
    } catch (err) {
      if (err.response) {
        console.error("Login Error:", err.response.data);
        setError(
          `Login failed: ${
            err.response.data.errors
              ? err.response.data.errors.map((err) => err.msg).join(", ")
              : err.response.data.message || "Unknown error occurred"
          }`
        );
      } else if (err.request) {
        //request made but no response received
        console.error("Login Error:", err.request);
        setError(
          "No response received from the server. Please try again later."
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Login Error:", err.message);
        setError("Error logging in. Please try again later.");
      }
      setSuccess("");
    }
  };

  return (
    <Container className="login-view">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form className="login-form" onSubmit={handleLogin}>
            <Form.Group controlId="formLoginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginView;
