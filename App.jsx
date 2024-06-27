import React from "react";
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
import FavoriteMovies from "./src/components/FavoriteMovies/FavoriteMovies";

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return (
    <Router>
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
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/update-profile" element={<UpdateView />} />
        <Route path="/favorites" element={<FavoriteMovies />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
