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
      <Navbar.Brand href="main-view">The Donkey Archive</Navbar.Brand>
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
              <Button
                variant="outline-info"
                className="mr-2"
                onClick={() => navigate("/update-profile")}
              >
                Update Profile
              </Button>
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
