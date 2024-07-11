import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { useUser } from "../../../UserContext";
import UserProfile from "../UserProfile/UserProfile";
import "./MainView.scss";

const MainView = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({ username: "", token: "" });
    navigate("/");
  };

  return (
    <Container fluid className="main-view">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={8} lg={6} className="text-center glassmorphic-card">
          <h1>Welcome to the Donkey Archive</h1>
          {!user.token ? (
            <>
              <Button
                variant="primary"
                onClick={() => navigate("/login")}
                className="m-2"
              >
                Login
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/register")}
                className="m-2"
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                onClick={() => navigate("/movies")}
                className="m-2"
              >
                Movies
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/directors")}
                className="m-2"
              >
                Directors
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate("/genres")}
                className="m-2"
              >
                Genres
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/favorite-movies")}
                className="m-2"
              >
                Favorites
              </Button>
              <Button variant="primary" onClick={handleLogout} className="m-2">
                Logout
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/add-favorite-movie")}
                className="m-2"
              >
                Add Favorite Movie
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowProfileModal(true)}
                className="m-2"
              >
                Update Profile
              </Button>
            </>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="text-center footer">
          <p>&copy; 2024 Donkey Archive. All rights reserved.</p>
        </Col>
      </Row>

      <Modal
        show={showProfileModal}
        onHide={() => setShowProfileModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserProfile />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MainView;
