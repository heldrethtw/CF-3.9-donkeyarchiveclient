import React from "react";
import Navbar from "../NavBar/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginView from "../LoginView/LoginView";

const MainView = () => (
  console.log("MainView"),
  (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/logout" element={<LoginView />} />
      </Routes>
    </Router>
  )
);

export default MainView;
