import React, { useState } from "react";
import axiosInstance from "../../axiosInstance"; // Import the configured axios instance
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import "./LoginView.scss";

const LoginView = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setLoggedIn(true);
    } catch (err) {
      setError("Error logging in");
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
