import react, { useState } from "react";
import MovieCard from "../MovieCard/movie-card";
import MovieView from "../MovieView/movie-view";
import "./main-view.scss";

const MainView = (props) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie)
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );

  const { movies } = props;

  if (movies.length === 0)
    return <div className="main-view">The list is empty!</div>;

  return (
    <div className="main-view">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(movie) => setSelectedMovie(movie)}
        />
      ))}
    </div>
  );
};
