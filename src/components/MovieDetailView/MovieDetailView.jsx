import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import "./MovieDetailView.scss";

const MovieDetailView = ({ userToken, username }) => {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/movies/${movieId}`,
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        setMovie(response.data);
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError("Error fetching movie. Please try again later.");
      }
    };
    fetchMovie();
  }, [movieId, userToken]);

  const handleAddFavorite = async (movieId) => {
    try {
      const response = await axios.post(
        `https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users/${username}/movies/${movieId}/favorites`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      console.log("Added to favorites:", response.data);
    } catch (err) {
      console.error("Add Favorite Error:", err);
      setError("Error adding favorite movie. Please try again later.");
    }
  };

  if (!movie) return null;

  return (
    <Card className="movie-detail-view">
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Card.Text>Director: {movie.Director.Name}</Card.Text>
        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
        <Card.Text>Release Year: {movie.ReleaseYear}</Card.Text>
        <Card.Text>Rating: {movie.Rating}</Card.Text>
        <Card.Text>
          <Button
            variant="primary"
            onClick={() => handleAddFavorite(movie._id)}
          >
            Add to Favorites
          </Button>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Back</Button>
          </Link>
        </Card.Text>
        {error && <p>{error}</p>}
      </Card.Body>
    </Card>
  );
};

export default MovieDetailView;
