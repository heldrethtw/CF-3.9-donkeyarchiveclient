import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainView from "./src/components/MainView/MainView";
import LoginView from "./src/components/LoginView/LoginView";
import RegistrationView from "./src/components/RegistrationView/RegistrationView";
import ProfileView from "./src/components/ProfileView/ProfileView";
import UpdateView from "./src/components/UpdateView/UpdateView";
import DirectorView from "./src/components/DirectorView/DirectorView";
import GenreView from "./src/components/GenreView/GenreView";
import MovieView from "./src/components/MovieView/MovieView";
import { useUser } from "./UserContext";
import LightModeDarkMode from "./src/services/LightModeDarkMode";
import "./App.scss";

const App = () => {
  const { user, logout } = useUser();
  const [loggedIn, setLoggedIn] = useState(!!user.token);

  useEffect(() => {
    setLoggedIn(!!user.token);
  }, [user]);

  return (
    <LightModeDarkMode>
      <Router>
        <div className="app">
          <button onClick={logout} className="logout-btn">Logout</button>
          <Routes>
            <Route path="/" element={<MainView />} />
            <Route
              path="/login"
              element={<LoginView setLoggedIn={setLoggedIn} />}
            />
            <Route
              path="/register"
              element={<RegistrationView setLoggedIn={setLoggedIn} />}
            />
            <Route
              path="/profile"
              element={loggedIn ? <ProfileView /> : <Navigate to="/login" />}
            />
            <Route
              path="/update-profile"
              element={loggedIn ? <UpdateView /> : <Navigate to="/login" />}
            />
            <Route
              path="/directors"
              element={loggedIn ? <DirectorView /> : <Navigate to="/login" />}
            />
            <Route
              path="/genres"
              element={loggedIn ? <GenreView /> : <Navigate to="/login" />}
            />
            <Route
              path="/movies"
              element={loggedIn ? <MovieView /> : <Navigate to="/login" />}
            />
            <Route
              path="/favorites"
              element={loggedIn ? <MovieView /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </LightModeDarkMode>
  );
};

export default App;
