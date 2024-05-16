import React, { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { RegistrationView } from "../RegistrationView/registration-view";
import { GenreView } from "../GenreView/genre-view";
import { DirectorView } from "../DirectorView/director-view";
import { ProfileView } from "../ProfileView/profile-view";
import { Navbar } from "../NavBar/nav-bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!storedToken) return;

    fetch("https://donkey-archive.herokuapp.com/movies", {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const constMovieFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre.Name,
            Director: movie.Director.Name,
            ImagePath: movie.ImagePath,
            Featured: movie.Featured,
          };
        });
        setMovies(constMovieFromApi);
      })
      .catch((err) => {
        console.error("There was an error loading the movies", err);
      });
  }, [storedToken]);

  const handleLogout = () => {
    setUser(null);
    storedToken(null);

    if (!user) {
      return (
        <>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <RegistrationView />
        </>
      );
    }
  };

  return (
    <div className="main-view">
      <Navbar user={user} onUserChange={setUser} />
      {selectedMovie ? (
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      ) : (
        movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(movie) => setSelectedMovie(movie)}
          />
        ))
      )}

      <GenreView />
      <DirectorView />
      <ProfileView />
    </div>
  );
};
const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");
const [user, setUser] = useState(storedUser);
const [movies, setMovies] = useState([]);
const [selectedMovie, setSelectedMovie] = useState(null);

useEffect(() => {
  if (!storedToken) return;

  fetch("https://donkey-archive.erokapp.com/movies", {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      constMovieFromApi = data.map((movie) => {
        return {
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: movie.Genre.Name,
          Director: movie.Director.Name,
          ImagePath: movie.ImagePath,
          Featured: movie.Featured,
        };
      });
      setMovies(constMovieFromApi);
    })
    .catch((err) => {
      console.error("There was an error loading the movies", err);
    });
}, [storedToken]);

const handleLogout = () => {
  setUser(null);
  storedToken(null);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <RegistrationView />
      </>
    );
  }

  return (
    <div className="main-view">
      <Navbar user={user} onUserChange={setUser} />
      {selectedMovie ? (
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      ) : (
        movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(movie) => setSelectedMovie(movie)}
          />
        ))
      )}

      <GenreView />
      <DirectorView />
      <ProfileView />
    </div>
  );
};
