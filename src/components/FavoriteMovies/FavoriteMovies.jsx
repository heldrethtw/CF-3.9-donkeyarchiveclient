import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./FavoriteMovies.scss";

const FavoriteMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const username = new URLSearchParams(location.search).get("username");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users/${username}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMovies(response.data);
      } catch (err) {
        setError(err.message);
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
