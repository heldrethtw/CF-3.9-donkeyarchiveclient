import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "./logo.png";
import SearchBar from "./search-bar";
import "./nav-bar.scss";

function NavBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="nav-bar">
      <div className="nav-bar-logo">
        <img src={Logo} alt="Donkey Archive Logo" />
      </div>
      <div className="nav-bar-search">
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="nav-bar-links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/genres">Genres</Link>
        <Link to="/directors">Directors</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}

export default NavBar;
