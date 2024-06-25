import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand >
          <Link to="/Web/">NotPineapple shop</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/Web/">Home</Link>
            </Nav.Link>
            <Nav.Link href="/Web/Cart/">
              <Link to="/Web/Cart/">Сatalog</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/Web/favourites/">Favourites</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/Web/overlay/">Basket</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
