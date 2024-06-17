import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import "./ProfileView.scss";

const ProfileView = () => {
  const [profileData, setProfileData] = useState({
    Username: "",
    Email: "",
    Birthday: "",
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Error fetching profile data");
      }
    };

    fetchProfileData();
  }, []);

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    console.log("Update profile request initiated");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users/${profileData.Username}`,
        {
          Username: profileData.Username,
          Email: profileData.Email,
          Birthday: profileData.Birthday,
          Password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Profile updated successfully.");
        setError("");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Error updating profile");
      setSuccess("");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  return (
    <Container className="profile-view">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form className="profile-form" onSubmit={handleUpdateProfile}>
            <Form.Group controlId="formProfileUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="Username"
                value={profileData.Username || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formProfileEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={profileData.Email || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formProfileBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                name="Birthday"
                value={
                  profileData.Birthday ? profileData.Birthday.slice(0, 10) : ""
                }
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formProfilePassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

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
