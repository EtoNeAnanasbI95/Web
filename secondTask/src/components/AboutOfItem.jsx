import React from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AppContexet } from "../App";

const AboutOfItem = (props) => {

  const context = React.useContext(AppContexet);

  const onClickAdd = (button) => {
    console.log();
    const {
      id,
      name: name,
      from: from,
      material: material,
      price: price,
    } = props.item;
    console.log("OnButtonCLickRun");
    console.log(button.target.textContent);
    context.onAdd(
      { id, name, from, material, price },
      button.target.textContent == "Add to favourites" ||
        button.target.textContent == "Remove from favourites" ||
        button.target.textContent == "Added to favourites"
        ? "favourites"
        : "basket"
    );
  };

  return (
    <Container className='my-5'>
      <h1>About of item</h1>
      <Card >
        <Card.Img variant="top" className='card-image'  src={props.item.image} />
        <Card.Body>
          <Card.Title>{props.item.name}</Card.Title>
          <Card.Text>
            {props.item.description}
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
          <div className='d-flex justify-content-between mt-2'>
            <Button
              variant="primary"
              onClick={onClickAdd}
            >
              {props.direction == "Favourites"
                ? context.isAdded(props.item.id, "favourites")
                  ? "Remove from favourites"
                  : "Add to favourites"
                : context.isAdded(props.item.id, "favourites")
                ? "Added to favourites"
                : "Add to favourites"}
            </Button>
            <Button
              variant="primary"
              onClick={onClickAdd}
            >
              {props.direction == "Basket"
                ? context.isAdded(props.item.id)
                  ? "Delete"
                  : "Add to basket"
                : context.isAdded(props.item.id)
                ? "Added to basket"
                : "Add to basket"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AboutOfItem