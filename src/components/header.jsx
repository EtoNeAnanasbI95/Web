import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand as={Link} to="/">NotPineapple shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/Cart/">Сatalog</Nav.Link>
            <Nav.Link as={Link} to="/favourites/">Favourites</Nav.Link>
            <Nav.Link as={Link} to="/overlay/">Basket</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
