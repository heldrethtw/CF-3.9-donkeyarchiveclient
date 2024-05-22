import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import NavBar from "./components/NavBar/nav-bar";
import DirectorView from "./components/DirectorView/director-view";
import GenreView from "./components/GenreView/genre-view";
import LoginView from "./components/LoginView/login-view";
import { MainView } from "./components/MainView/main-view";
import { MovieCard } from "./components/MovieCard/movie-card";
import MovieView from "./components/MovieView/movie-view";
import ProfileView from "./components/ProfileView/profile-view";
import RegistrationView from "./components/RegistrationView/registration-view";
import LoginView from "./components/LoginView/login-view";
import { MovieView } from "./components/MovieView/movie-view";

const DonkeyArchiveClient = () => {
  return (
    <Router>
      <div className="donkey-archive">
        <NavBar />
        <Routes>
          <Route path="/mainview" element={<MainView />} />
          <Route path="/register" element={<RegistrationView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/movies/:movieId" element={<MovieView />} />
          <Route path="/movies" element={<MovieCard />} />
          <Route path="/genres/:genreId" element={<GenreView />} />
          <Route path="/directors/:directorId" element={<DirectorView />} />
          <Route path="/profile" element={<ProfileView />} />
        </Routes>
      </div>
    </Router>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<DonkeyArchiveClient />);
