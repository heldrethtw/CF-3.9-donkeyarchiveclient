import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import "./directorview.scss";

export const DirectorView = ({ directorID }) => {
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://donkey-archive.herokuapp.com/directors/${directorID}`)
      .then((response) => response.json())
      .then((data) => {
        setDirector(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error loading the director", error);
        setError("There was an error loading the director");
        setLoading(false);
      });
  }, [directorID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="director-view">
      <h1>{director.Name}</h1>
      <p>
        <strong>Bio</strong>
        {director.Bio}
      </p>
      <p>
        <strong>Born</strong>
        {director.Birth}
      </p>
      <p>
        <strong>Died</strong>
        {director.Death}
      </p>
      <ul>
        {director.Movies.map((movie) => (
          <li key={movie._id}>{movie.Title}</li>
        ))}
      </ul>
    </div>
  );
};

DirectorView.PropTypesTypes = {
  directorID: PropTypes.string.isRequired,
};

export default DirectorView;
