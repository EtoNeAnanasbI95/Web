import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContexet } from "../App";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const Item = (props) => {
  const navigate = useNavigate();

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
    context.onAdd(
      { id, name, from, material, price },
      button.target.textContent == "Add to favourites" ||
        button.target.textContent == "Remove from favourites" ||
        button.target.textContent == "Added to favourites"
        ? "favourites"
        : "basket"
    );
  };

  const onAboutClick = () => {
    console.log("onAboutClickRun");
    context.setAboutItam(props.obj)
    return (
      navigate('/AboutOf')
    )
  }

  return (
    <div className="mt-2">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: props.delay  }}   
      >
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>{props.from}</Card.Text>
            <Card.Text>{props.material}</Card.Text>
            <Card.Text>{props.price}</Card.Text>
            {props.direction == "Tables" || props.direction == "Favourites" ? (
              <>
                <motion.div whileTap="bounce" whileHover="pressed" initial='rest' variants={context.animations}>
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
                </motion.div>
                <motion.div whileTap="bounce" whileHover="pressed" initial='rest' variants={context.animations}>
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
                </motion.div>
                <br />
                <motion.div whileTap="bounce" whileHover="pressed" initial='rest' variants={context.animations}>
                  <Button onClick={onAboutClick} variant="link">About of item</Button>
                </motion.div>
              </>
            ) : ( (props.direction === undefined ? "" : (
              <>
                <motion.div whileTap="bounce" whileHover="pressed" initial='rest' variants={context.animations}>
                  <Button
                    variant={props.direction == "Basket" ? "danger" : "primary"}
                    onClick={onClickAdd}
                  >
                    {props.direction == "Basket"
                      ? context.isAdded(props.id)
                        ? "Delete"
                        : "Add to basket"
                      : context.isAdded(props.id)
                      ? "Added"
                      : "Add to basket"}
                  </Button>
                </motion.div>
              </>
            ))
            )}
          </Card.Body>
        </Card>
      </motion.div>
    </div>
  );
};

export default Item;
