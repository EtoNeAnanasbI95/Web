import React from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const AboutOfItem = (props) => {
    
    console.log("about props")
    console.log(props)

  return (
    <Container className='my-5'>
      <h1 className=''>About of item</h1>
      <Card >
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{props.item.name}</Card.Title>
          <Card.Text>
            {props.item.description}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AboutOfItem