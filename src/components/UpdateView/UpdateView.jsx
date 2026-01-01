import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../../services/API";
import "./UpdateView.scss";

const UpdateView = () => {
  const [profileData, setProfileData] = useState({
    Username: "",
    Email: "",
    Birthday: "",
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getUserProfile();
        setProfileData(response.data);
        setError("");
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError(error.message || "Error fetching profile data. Please try again later.");
      }
    };

    fetchProfileData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile(profileData.Username, {
        Username: profileData.Username,
        Email: profileData.Email,
        Birthday: profileData.Birthday,
        Password: password,
      });

      if (response.status === 200) {
        setSuccess("Profile updated successfully.");
        setError("");
        navigate("/profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || "Error updating profile. Please try again later.");
      setSuccess("");
    }
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  return (
    <Container className="update-view">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Update Profile</h1>
          <Form className="update-form" onSubmit={handleUpdateProfile}>
            <Form.Group controlId="formUpdateUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="Username"
                value={profileData.Username || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formUpdateEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={profileData.Email || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formUpdateBirthday">
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

            <Form.Group controlId="formUpdatePassword">
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

export default UpdateView;
