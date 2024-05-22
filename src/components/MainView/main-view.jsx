import React, { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { RegistrationView } from "../RegistrationView/registration-view";
import { GenreView } from "../GenreView/genre-view";
import { DirectorView } from "../DirectorView/director-view";
import { ProfileView } from "../ProfileView/profile-view";
import NavBar from "../NavBar/nav-bar";
import "./mainview.scss";
import "../MovieCard/moviecard.scss";
import "../MovieView/movieview.scss";
import "../NavBar/navbar.scss";
import "../ProfileView/profileview.scss";
import "../GenreView/genreview.scss";
import "../DirectorView/directorview.scss";
import "../LoginView/loginview.scss";
import "../RegistrationView/registrationview.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [selectedDirectorName, setSelectedDirectorName] = useState(null);
  const [isProfileView, setIsProfileView] = useState(false);

  useEffect(() => {
    if (!storedToken) return;

    fetch("https://donkey-archive.herokuapp.com/movies", {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: movie.Genre.Name,
          GenreId: movie.Genre._id,
          Director: movie.Director.Name,
          ImagePath: movie.ImagePath,
          Featured: movie.Featured,
        }));
        setMovies(moviesFromApi);
      })
      .catch((err) => {
        console.error("There was an error loading the movies", err);
      });
  }, [storedToken]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            onLoggedOut = { handleLogout };
          }}
        />
        <RegistrationView />
      </>
    );
  }

  return (
    <div className="main-view">
      <NavBar
        user={user}
        onUserChange={setUser}
        onProfileClick={() => setIsProfileView(true)}
        onLogoutClick={handleLogout}
      />
      {isProfileView ? (
        <ProfileView user={user} onBackClick={() => setIsProfileView(false)} />
      ) : selectedMovie ? (
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      ) : selectedGenreId ? (
        <GenreView genreId={selectedGenreId} />
      ) : selectedDirectorName ? (
        <DirectorView directorName={selectedDirectorName} />
      ) : (
        movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(movie) => setSelectedMovie(movie)}
            onGenreClick={(genreId) => setSelectedGenreId(genreId)}
            onDirectorClick={(directorName) =>
              setSelectedDirectorName(directorName)
            }
          />
        ))
      )}
    </div>
  );
};
