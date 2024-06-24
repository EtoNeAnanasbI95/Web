import React from "react";
import Item from "./Item";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { AppContexet } from "../App";
import InputGroup from 'react-bootstrap/InputGroup';
import "bootstrap/dist/css/bootstrap.min.css";

const CartItem = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const context = React.useContext(AppContexet);

  const onAdd = (obj, direction) => {
    console.log();
    console.log("onAdd hendler");
    console.log("curr dir", direction);
    console.log("cur obj", obj);
    const currentObj =
      direction == "favourites" ? context.favourites : context.basket;
    const currentSetter =
      direction == "favourites" ? context.setFavourites : context.setBasket;
    try {
      if (currentObj.find((item) => Number(item.id) === Number(obj.id))) {
        context.deleteFrom(obj, direction.toLowerCase());
      } else {
        console.log("go post");
        axios.post(`http://localhost:3001/${direction.toLowerCase()}`, obj);
        currentSetter([...currentObj, obj]);
      }
    } catch (Error) {
      alert(`Something went error ${Error}`);
    }
  };

  const onCheck = (e) => setIsChecked(e.target.checked);
  const onSearch = (e) => setSearch(e.target.value);
  const onSelectedCategory = (e) => setSelectedCategory(e.target.value);

  const filteredData = props.data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  ).filter((item) => selectedCategory === "all" || selectedCategory === item.category);

  let total = 0;

  console.log(props);
  return (
    <>
      {props.direction === "Basket" && props.data.length == 0 ? (
        <h1 className="d-flex " style={{ justifyContent: "center" }}>
          Basket is empty
        </h1>
      ) : (
        <div>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            {props.direction}
          </h1>
          <InputGroup className="mb-3 text-center">
            <InputGroup.Checkbox isChecked={isChecked} onChange={onCheck} />
            <Form.Control disabled={!isChecked} onChange={onSearch} placeholder="Search" />
          </InputGroup>
          <Form.Select className="mb-3" onChange={onSelectedCategory}>
            <option value="all">Selected category</option>
            <option value="USA">USA</option>
            <option value="Europe">Europe</option>
          </Form.Select>
          <div className="Carts">
            {filteredData.map((obj) => {
              total =+ Number(obj.price);
              return (
                <Item
                  key={obj.id}
                  id={obj.id}
                  direction={props.direction}
                  name={obj.name}
                  from={obj.from}
                  material={obj.material}
                  price={obj.price}
                  obj={obj}
                  onPlus={onAdd}
                />
              );
            })}
          </div>
        </div>
      )}
      {props.direction == "Basket" ? (
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            "margin-top": "10rem",
          }}
        >
          Total: {total}
        </h2>
      ) : (
        ""
      )}
    </>
  );
};

export default CartItem;
