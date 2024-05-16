import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./movie-card.scss";

export function MovieCard(props) {
  const { movie, onMovieClick } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      {isHovered && (
        <div className="overlay">
          <div className="overlay-text">{movie.Description}</div>
        </div>
      )}
      <img className="movie-poster" src={movie.ImagePath} />
      <div className="movie-title">{movie.Title}</div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
