import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../UserContext";
import "./NavBar.scss";

const NavBar = ({ isProfileView }) => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="navbar">
      <Navbar.Brand href="/" className="navbar-brand">
        The Donkey Archive Main Page
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="navbar-toggler"
      />
      <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
        <Nav className="ml-auto">
          {user && user.token ? (
            <>
              {!isProfileView && (
                <LinkContainer to="/profile">
                  <Button
                    variant="outline-info"
                    className="mr-2 btn-outline-info"
                  >
                    Profile
                  </Button>
                </LinkContainer>
              )}
              <LinkContainer to="/update-profile">
                <Button
                  variant="outline-info"
                  className="mr-2 btn-outline-info"
                >
                  Update Profile
                </Button>
              </LinkContainer>
              <LinkContainer to="/directors">
                <Button
                  variant="outline-info"
                  className="mr-2 btn-outline-info"
                >
                  Directors
                </Button>
              </LinkContainer>
              <LinkContainer to="/genres">
                <Button
                  variant="outline-info"
                  className="mr-2 btn-outline-info"
                >
                  Genres
                </Button>
              </LinkContainer>
              <LinkContainer to="/movies">
                <Button
                  variant="outline-info"
                  className="mr-2 btn-outline-info"
                >
                  Movies
                </Button>
              </LinkContainer>
              <Button
                variant="outline-danger"
                className="btn-outline-danger"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline-success"
                className="btn-outline-success"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <LinkContainer to="/register">
                <Nav.Link className="nav-link">Register</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
