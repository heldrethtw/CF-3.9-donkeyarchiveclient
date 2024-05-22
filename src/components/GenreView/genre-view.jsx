import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import "./genreview.scss";

export const GenreView = ({ genreId }) => {
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://donkey-archive.herokuapp.com/genres/${genreId}`)
      .then((response) => response.json())
      .then((data) => {
        setGenre(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error loading the genre", error);
        setError("There was an error loading the genre");
        setLoading(false);
      });
  }, [genreId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="genre-view">
      <h1>{genre.Name}</h1>
      <p>
        <strong>Description</strong>
        {genre.Description}
      </p>
      <ul>
        {genre.Movies.map((movie) => (
          <li key={movie._id}>{movie.Title}</li>
        ))}
      </ul>
    </div>
  );
};

GenreView.PropTypesTypes = {
  genreId: PropTypes.string.isRequired,
};

export default GenreView;
