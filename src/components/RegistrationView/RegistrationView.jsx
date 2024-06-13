import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import "./RegistrationView.scss";

const RegistrationView = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birth,
      };

      const response = await fetch(
        "https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:1234",
          },
          body: JSON.stringify(data),
        }
      );

      let responseData;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.indexOf("application/json") !== -1) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (response.ok) {
        localStorage.setItem("token", responseData.token);
        setLoggedIn(true);
        setSuccess("Registration successful! You are now logged in.");
      } else {
        try {
          const errorData = await response.json();
          console.log("Registration Error:", errorData);
          setError(
            `Error registering: ${errorData.errors
              .map((err) => err.msg)
              .join(", ")}`
          );
        } catch (jsonError) {
          const errorText = await response.text();
          console.log("Registration Error:", errorText);
          setError(`Error registering: ${errorText}`);
        }
      }
    } catch (err) {
      console.log(err);
      setError("Error registering");
    }
  };

  return (
    <Container className="registration-view">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form className="registration-form" onSubmit={handleRegister}>
            <Form.Group controlId="formRegistrationUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formRegistrationEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formRegistrationPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formRegistrationBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
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
