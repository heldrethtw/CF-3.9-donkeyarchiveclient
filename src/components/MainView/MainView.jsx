import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./MainView.scss";

const MainView = () => {
  const navigate = useNavigate();

  return (
    <Container className="main-view">
      <Row className="justify-content-md-center">
        <Col md={6} className="text-center">
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
            Search Movies
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/directors")}
            className="m-2"
          >
            Search Directors
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate("/genres")}
            className="m-2"
          >
            Search Genres
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("favorite-movies")}
            className="m-2"
          >
            Favorite Movies
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MainView;
