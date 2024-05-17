// src/components/MovieCard/movie-card.jsx
import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import "./movie-card.scss";

export function MovieCard(props) {
  const { movie, onMovieClick, onGenreClick, onDirectorClick } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="overlay">
          <div className="overlay-text">{movie.Description}</div>
        </div>
      )}
      <img className="movie-poster" src={movie.ImagePath} alt={movie.Title} />
      <div className="movie-title">{movie.Title}</div>
      <button onClick={() => onMovieClick(movie)}>View Details</button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onGenreClick(movie.GenreId);
        }}
      >
        View Genre
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDirectorClick(movie.Director);
        }}
      >
        View Director
      </button>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onDirectorClick: PropTypes.func.isRequired,
};
