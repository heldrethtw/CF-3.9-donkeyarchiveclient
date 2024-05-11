import react, { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { RegistrationView } from "../RegistrationView/registration-view";
import { GenreView } from "../GenreView/genre-view";
import { DirectorView } from "../DirectorView/director-view";
import { ProfileView } from "../ProfileView/profile-view";
import { Navbar } from "../NavBar/nav-bar";

export const MainView = (props) => {
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
        console.log(data);
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
      .catch((err) => console.log(err));
  }, []);

  setMovies(constMovieFromApi);
};

export default MainView;
