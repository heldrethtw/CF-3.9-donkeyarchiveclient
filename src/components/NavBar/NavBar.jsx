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
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">The Donkey Archive</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {user && user.token ? (
            <>
              {!isProfileView && (
                <LinkContainer to="/profile">
                  <Button variant="outline-info" className="mr-2">
                    Profile
                  </Button>
                </LinkContainer>
              )}
              <LinkContainer to="/update-profile">
                <Button variant="outline-info" className="mr-2">
                  Update Profile
                </Button>
              </LinkContainer>
              <LinkContainer to="/directors">
                <Button variant="outline-info" className="mr-2">
                  Directors
                </Button>
              </LinkContainer>
              <LinkContainer to="/genres">
                <Button variant="outline-info" className="mr-2">
                  Genres
                </Button>
              </LinkContainer>
              <LinkContainer to="/movies">
                <Button variant="outline-info" className="mr-2">
                  Movies
                </Button>
              </LinkContainer>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline-success"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
