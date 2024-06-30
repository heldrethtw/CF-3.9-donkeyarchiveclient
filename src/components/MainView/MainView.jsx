import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./MainView.scss";

const MainView = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="main-view">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={8} lg={6} className="text-center glassmorphic-card">
          <h1>Welcome to the Donkey Archive</h1>
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
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="text-center footer">
          <p>&copy; 2024 Donkey Archive. All rights reserved.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MainView;
