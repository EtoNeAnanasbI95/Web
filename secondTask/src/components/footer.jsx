import Card from "react-bootstrap/Card";

function Footer() {
  return (
    <footer>
      <Card className="text-center">
        <Card.Header >Contact and happy happy happy</Card.Header>
        <Card.Body>
          <Card.Title>Special trash text</Card.Title>
          <Card.Text>
            This a little final WEB project fow MPT and legendari proffessor
            Alexandra Kalinina, omg no way
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <span>
            Author:{" "}
            <a href="https://github.com/EtoNeAnanasbI95">EtoNeAnanasbI95</a>
          </span>
          <p>© 2024 Copyright</p>
        </Card.Footer>
      </Card>
    </footer>
  );
}

export default Footer;
