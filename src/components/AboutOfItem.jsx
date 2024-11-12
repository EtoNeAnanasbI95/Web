import React from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AppContexet } from "../App";
import { motion } from 'framer-motion';

const AboutOfItem = (props) => {

  const context = React.useContext(AppContexet);

  const onClickAdd = (button) => {
    const {
      id,
      name: name,
      from: from,
      material: material,
      price: price,
    } = props.item;
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
    <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: props.delay  }}>
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
            <motion.div whileTap="bounce" whileHover="pressed" initial='rest' variants={context.animations}>
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
            </motion.div>
            <motion.div whileTap="bounce" whileHover="pressed" initial='rest' variants={context.animations}>
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
            </motion.div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </motion.div>
  )
}

export default AboutOfItem