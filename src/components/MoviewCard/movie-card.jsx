import React from "react";
import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss";

function MovieCard(props) {
  const { movie, onMovieClick } = props;
  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      <img className="movie-poster" src={movie.ImagePath} />
      <div className="movie-title">{movie.Title}</div>
    </div>
  );
}

return (
  <div className="donkey-archive">
    <h1>Donkey Archive</h1>
  </div>
);

function MovieCard(props) {
  const { movie, onMovieClick } = props;

  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      <img className="movie-poster" src={movie.ImagePath} />
      <div className="movie-title">{movie.Title}</div>
    </div>
  );
}

export default MovieCard;
