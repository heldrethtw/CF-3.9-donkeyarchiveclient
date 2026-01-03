import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./RegistrationView.scss";

const RegistrationView = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !email) {
      setError("Please fill in all required fields (username, password, and email).");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post(
        "https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users",
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        setLoggedIn(true);
        setSuccess("Registration successful! You are now logged in.");
        setError("");
        navigate("/main-view");
      } else {
        setError(
          "Registration failed. Please check your inputs and try again."
        );
        setSuccess("");
      }
    } catch (err) {
      console.error("Registration Error:", err);

      // Extract user-friendly error message
      let errorMessage = "Error registering. Please try again later.";
      if (err.response) {
        const status = err.response.status;
        const serverMessage = err.response.data?.message || err.response.data?.error;

        if (status === 400) {
          errorMessage = serverMessage || "Invalid input. Please check your information.";
        } else if (status === 409) {
          errorMessage = serverMessage || "Username or email already exists. Please choose different credentials.";
        } else if (status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (serverMessage) {
          errorMessage = serverMessage;
        }
      } else if (err.request) {
        errorMessage = "Network error. Please check your internet connection.";
      }

      setError(errorMessage);
      setSuccess("");
    }
  };

  return (
    <div>
      <span className="RegSpan">The Donkey Archive User Registration</span>
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
              <Form.Group controlId="formRegisterBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
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
    </div>
  );
};

export default RegistrationView;
