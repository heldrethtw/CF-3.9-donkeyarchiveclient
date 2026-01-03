import React, { useState, useEffect } from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { getFavorites } from "../../services/API";
import "./FavoriteMovies.scss";

const FavoriteMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const username = new URLSearchParams(location.search).get("username");

  useEffect(() => {
    const fetchMovies = async () => {
      if (!username) {
        setError("Username is required to view favorites.");
        setLoading(false);
        return;
      }

      try {
        const response = await getFavorites(username);
        setMovies(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching favorite movies:", err);
        setError(err.message || "Error loading favorite movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container className="favorite-movies">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Your Favorite Movies</h1>
          {movies.length > 0 ? (
            <ul>
              {movies.map((movie) => (
                <li key={movie._id}>{movie.Title}</li>
              ))}
            </ul>
          ) : (
            <p>No favorite movies found.</p>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
        </Col>
      </Row>
    </Container>
  );
};

export default FavoriteMovies;
