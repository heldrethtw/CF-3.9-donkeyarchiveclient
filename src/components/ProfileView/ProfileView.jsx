import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./ProfileView.scss";

const ProfileView = () => {
  const navigate = useNavigate();

  return (
    <Container className="profile-view">
      <Row className="justify-content-md-center">
        <Col md={6} className="text-center">
          <h1>Your Profile</h1>
          <Button
            variant="primary"
            onClick={() => navigate("/update-profile")}
            className="m-2"
          >
            Update Profile
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileView;
