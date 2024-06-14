import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AppContexet } from '../App'

const Item = (props) => {

  const context = React.useContext(AppContexet)

  const onClickAdd = () => {
    const { id, name:name, from:from, material:material, price:price} = props
    props.onPlus({id, name:name, from, material, price})
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {props.from}
        </Card.Text>
        <Card.Text>
          {props.material}
        </Card.Text>
        <Card.Text>
          {props.price}
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
        <Button variant={props.direction == "Basket" ? "danger" : "primary"} onClick={onClickAdd}>
          {
            props.direction == "Basket" ? (context.isAdded(props.id) ? "Удалить" : "Добавить в корзину") :
            context.isAdded(props.id) ? "Добавлен" : "Добавить в корзину"
          }
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Item 