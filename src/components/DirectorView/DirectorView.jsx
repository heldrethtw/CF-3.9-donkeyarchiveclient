import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import "./DirectorView.scss";

const DirectorView = ({ director }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://donkey-archive-af41e8314602.herokuapp.com/api/movies/directors/${searchTerm}`
      );
      setMovies(response.data);
    } catch (err) {
      console.error("Search Error:", err);
      setError("Error searching for movies. Please try again later.");
    }
  };

  return (
    <Container className="director-view">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Search for a Director</h1>
          <Form onSubmit={handleSearch}>
            <Form.Group controlId="formDirectorSearch">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
          <ListGroup>
            {movies.map((movie) => (
              <ListGroup.Item key={movie._id}>{movie.Title}</ListGroup.Item>
            ))}
          </ListGroup>
          {error && <p>{error}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default DirectorView;
