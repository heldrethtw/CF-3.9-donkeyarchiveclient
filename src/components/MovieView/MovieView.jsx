import React, { useState, useEffect, useContext } from "react";
import { useUser } from "../../../UserContext";
import { Container, Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import {
  searchMoviesByTitle,
  getAllMovies,
  addFavoriteMovie,
  removeFavoriteMovie,
} from "../../services/API";
import { ThemeContext } from "../../services/LightModeDarkMode";
import "./MovieView.scss";

const MovieView = () => {
  const { user } = useUser();
  const { isDarkMode } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = async () => {
    try {
      const response = await getAllMovies();
      setMovies(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching all movies:", err);
      setError("Error fetching all movies. Please try again later.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await searchMoviesByTitle(searchTerm);
      console.log("API response:", response.data);
      setMovies(Array.isArray(response.data) ? response.data : [response.data]);
      setError("");
    } catch (err) {
      console.error("Search Error:", err);
      setError("Error searching for movies. Please try again later.");
      setMovies([]);
    }
  };

  const handleAddFavorite = async (movieId) => {
    if (!user || !user.username) {
      setError("You must be logged in to add favorites");
    }
    console.log("Adding favorite:", movieId);
    try {
      const response = await addFavoriteMovie(user.username, movieId);
      console.log("Add favorite response:", response);
      setMovies(
        movies.map((movie) =>
          movie._id === movieId ? { ...movie, isFavorite: true } : movie
        )
      );
    } catch (err) {
      console.error(
        "Error adding favorite movie:",
        err.response ? err.response.data : err
      );
      console.error("Full error object:", err);
      setError("Error adding favorite movie. Please try again later.");
    }
  };

  const handleRemoveFavorite = async (movieId) => {
    console.log("Removing favorite:", movieId);
    try {
      const response = await removeFavoriteMovie(user.username, movieId);
      console.log("Remove favorite response:", response);
      setMovies(
        movies.map((movie) =>
          movie._id === movieId ? { ...movie, isFavorite: false } : movie
        )
      );
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  return (
    <Container
      className={`movie-view ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>The Donkey Archive</h1>
          <Form onSubmit={handleSearch}>
            <Form.Group controlId="formMovieSearch">
              <Form.Label>Enter Movie Title</Form.Label>
              <Form.Control
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" className="search" type="submit">
              Search
            </Button>
          </Form>
          <h2>Scroll to view all movies</h2>
          {error && <p className="text-danger">{error}</p>}
          {movies.length > 0 ? (
            <ListGroup className="movie-list">
              {movies.map((movie) => (
                <ListGroup.Item key={movie._id}>
                  {movie.Title}
                  <Button
                    variant="success"
                    onClick={() => handleAddFavorite(movie._id)}
                  >
                    Add to Favorites
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFavorite(movie._id)}
                  >
                    Remove from Favorites
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No movies found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};




export default MovieView;
