import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Logo from "./logo.png";
import "./nav-bar.scss";

const NavBar = ({ user, onUserChange, onProfileClick }) => {
  const handleLogout = () => {
    onUserChange(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Donkey Archive Logo"
          />
          Donkey Archive
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/movies">
              <Nav.Link>Movies</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/genres">
              <Nav.Link>Genres</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/directors">
              <Nav.Link>Directors</Nav.Link>
            </LinkContainer>
            {user && (
              <>
                <Nav.Link onClick={onProfileClick}>Profile</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
  }),
  onUserChange: PropTypes.func.isRequired,
  onProfileClick: PropTypes.func.isRequired,
};

export default NavBar;
