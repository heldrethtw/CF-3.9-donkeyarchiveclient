import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import NavBar from "./components/NavBar/nav-bar";
import "./components/DirectorView/directorview.scss";
import "./components/GenreView/genreview.scss";
import "./components/LoginView/loginview.scss";
import "./components/MainView/mainview.scss";
import "./components/MovieCard/moviecard.scss";
import "./components/MovieView/movieview.scss";
import "./components/ProfileView/profileview.scss";
import "./components/RegistrationView/registrationview.scss";

const DonkeyArchiveClient = () => {
  return (
    <Router>
      <div className="donkey-archive">
        <NavBar />
        <h1>Welcome!</h1>
      </div>
    </Router>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<DonkeyArchiveClient />);
