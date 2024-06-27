import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../UserContext"; // Ensure you have the user context
import "./LoginView.scss";

const LoginView = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser(); // Access setUser from user context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://donkey-archive-af41e8314602.herokuapp.com/api/auth/login",
        { Username: username, Password: password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        const { token, Username } = response.data; // Adjust destructuring to match your response
        localStorage.setItem("token", token);
        setUser({ username: Username, token });
        setLoggedIn(true);
        setSuccess("Login successful! You are now logged in.");
        setError("");
        navigate("/profile");
      } else {
        setError("Login failed. Please check your credentials and try again.");
        setSuccess("");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Error logging in. Please try again later.");
      setSuccess("");
    }
  };

  return (
    <Container className="login-view">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formLoginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
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
