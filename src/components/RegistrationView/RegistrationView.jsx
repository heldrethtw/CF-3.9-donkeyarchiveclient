import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./RegistrationView.scss";

const RegistrationView = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://donkey-archive-af41e8314602.herokuapp.com/api/auth/register",
        { Username: username, Password: password, Email: email },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setLoggedIn(true);
        setSuccess("Registration successful! You are now logged in.");
        setError("");
        navigate("/profile"); // Assuming you have a ProfileView route
      } else {
        setError(
          "Registration failed. Please check your inputs and try again."
        );
        setSuccess("");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setError("Error registering. Please try again later.");
      setSuccess("");
    }
  };

  return (
    <Container className="registration-view">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formRegisterUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formRegisterPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formRegisterEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationView;
