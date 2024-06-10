import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
//import axiosInstance from "../../axiosInstance";
import "./ProfileView.scss";

const ProfileView = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/user");
        setUser(response.data);
      } catch (err) {
        setError("Error fetching user data");
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put("/api/auth/user", user);
      setSuccess("User data updated");
    } catch (err) {
      setError("Error updating user data");
    }
  };

  return (
    <Container className="profile-view">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>User Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formProfileUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProfileEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileView;
