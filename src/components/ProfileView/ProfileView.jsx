import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Modal,
  Alert,
  Spinner,
  Button,
} from "react-bootstrap";
import "./ProfileView.scss";
import NavBar from "../NavBar/NavBar";
import { useUser } from "../../../UserContext";
import { getUserProfile, updateUserProfile } from "../../services/API";

const ProfileView = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [profileData, setProfileData] = useState({
    Username: user.username,
    Email: user.email,
    Birthday: user.birthday || "",
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !user.token) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getUserProfile(user.username);
        setProfileData(response.data);
        setError("");
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError(error.message || "Error fetching profile data. Please try again later.");
      }
    };

    if (user.username) {
      fetchProfileData();
    }
  }, [user.username]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await updateUserProfile(profileData.Username, {
        Username: profileData.Username,
        Email: profileData.Email,
        Birthday: profileData.Birthday,
        Password: password,
      });

      if (response.status === 200) {
        setSuccess("Profile updated successfully.");
        setUser({ ...user, ...profileData });
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, ...profileData })
        );
        setShowModal(false);
        navigate("/update");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || "Error updating profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <NavBar isProfileView={true} />
      <Container className="profile-view">
        <Row className="justify-content-md-center">
          <Col md={6} className="text-center">
            <h1>Profile</h1>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="update-form" onSubmit={handleUpdateProfile}>
            <Form.Group controlId="formUpdateUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="Username"
                value={profileData.Username || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formUpdateEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={profileData.Email || ""}
                onChange={handleChange}
                required
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

            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Button variant="primary" type="submit" disabled={loading}>
              Update Profile
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfileView;
