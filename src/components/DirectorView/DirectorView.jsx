import React, { useState } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import { searchMoviesByDirector } from "../../services/API";
import "./DirectorView.scss";

const DirectorView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [director, setDirector] = useState(null);
  const [directorMovies, setDirectorMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await searchMoviesByDirector(searchTerm);
      setMovies(response.data.movies);
      setDirector(response.data.director);
      setError("");
    } catch (err) {
      console.error("Search Error:", err);
      setError(err.message || "Error searching for movies. Please try again later.");
      setMovies([]);
      setDirector(null);
    }
  };

  return (
    <Container className="director-view">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Search for a Director</h1>
          <Form onSubmit={handleSearch}>
            <Form.Group controlId="formDirectorSearch">
              <Form.Label>Director Name</Form.Label>
              <Form.Control
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter director's name"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>

          {director && (
            <div className="director-info mt-4">
              <h2>{director.Name}</h2>
              <p>
                <strong>Bio:</strong> {director.Bio}
              </p>
              <p>
                <strong>Birth:</strong> {director.Birth}
              </p>
              {director.Death && (
                <p>
                  <strong>Death:</strong> {director.Death}
                </p>
              )}
            </div>
          )}

          {movies.length > 0 && (
            <div className="mt-4">
              <h3>Movies by this Director:</h3>
              <ListGroup>
                {movies.map((movie) => (
                  <ListGroup.Item key={movie._id}>{movie.Title}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}

          {error && <p className="text-danger mt-3">{error}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default DirectorView;
