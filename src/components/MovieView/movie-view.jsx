import PropTypes from "prop-types";
import React from "react";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img className="movie-poster" src={movie.ImagePath} />
      </div>
      <div>
        <span className="label">Title: </span>
        <span className="value">{movie.Title}</span>
        <div>
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div>
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div>
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
          <button onClick={onBackClick}>Back</button>
        </div>
      </div>
    </div>
  );
};

MovieView.propTypes = {
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
  onBackClick: PropTypes.func.isRequired,
};
