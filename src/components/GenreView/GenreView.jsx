import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import "./GenreView.scss";

const GenreView = ({ genre }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://donkey-archive-af41e8314602.herokuapp.com/api/movies/genres/${searchTerm}`
      );
      setMovies(response.data);
    } catch (err) {
      console.error("Search Error:", err);
      setError("Error searching for movies. Please try again later.");
    }
  };

  return (
    <Container className="genre-view">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Search for a Genre</h1>
          <Form onSubmit={handleSearch}>
            <Form.Group controlId="formGenreSearch">
              <Form.Label>Genre</Form.Label>
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

export default GenreView;
