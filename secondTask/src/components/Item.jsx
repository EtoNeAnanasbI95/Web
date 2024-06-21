import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContexet } from "../App";

const Item = (props) => {
  const context = React.useContext(AppContexet);

  const onClickAdd = (button) => {
    console.log();
    const {
      id,
      name: name,
      from: from,
      material: material,
      price: price,
    } = props;
    console.log("OnButtonCLickRun");
    console.log(button.target.textContent);
    props.onPlus(
      { id, name, from, material, price },
      button.target.textContent == "Add to favourites" ||
        button.target.textContent == "Remove from favourites" ||
        button.target.textContent == "Added to favourites"
        ? "favourites"
        : "basket"
    );
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.from}</Card.Text>
        <Card.Text>{props.material}</Card.Text>
        <Card.Text>{props.price}</Card.Text>
        {props.direction == "Tables" || props.direction == "Favourites" ? (
          <>
            <Button
              className="mt-2"
              variant={props.direction == "Favourites" ? "danger" : "primary"}
              onClick={onClickAdd}
            >
              {props.direction == "Favourites"
                ? context.isAdded(props.id, "favourites")
                  ? "Remove from favourites"
                  : "Add to favourites"
                : context.isAdded(props.id, "favourites")
                ? "Added to favourites"
                : "Add to favourites"}
            </Button>
            <Button
              className="mt-2"
              variant={props.direction == "Basket" ? "danger" : "primary"}
              onClick={onClickAdd}
            >
              {props.direction == "Basket"
                ? context.isAdded(props.id)
                  ? "Delete"
                  : "Add to basket"
                : context.isAdded(props.id)
                ? "Added to basket"
                : "Add to basket"}
            </Button>
          </>
        ) : (
          <>
            <Button
              variant={props.direction == "Basket" ? "danger" : "primary"}
              onClick={onClickAdd}
            >
              {props.direction == "Basket"
                ? context.isAdded(props.id)
                  ? "Delete"
                  : "Add to basket"
                : context.isAdded(props.id)
                ? "Добавлен"
                : "Добавить в корзину"}
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Item;
