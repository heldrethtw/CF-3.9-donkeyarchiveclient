import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
//import axiosInstance from "../../axiosInstance";
import { LinkContainer } from "react-router-bootstrap";

const NavBar = ({ loggedIn, handleLogout }) => {
  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://donkey-archive-af41e8314602.herokuapp.com/api/auth/login",
        {
          username: "user",
          password: "password",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      window.location.reload();
    } catch (err) {
      console.error("Error logging in", err);
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="main-view">DA</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {loggedIn ? (
            <>
              <LinkContainer to="/profile">
                <Button variant="outline-info" className="mr-2">
                  Profile
                </Button>
              </LinkContainer>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline-success" onClick={handleLogin}>
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
