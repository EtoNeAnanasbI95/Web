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

  const onCheck = (e) => setIsChecked(e.target.checked);
  const onSearch = (e) => setSearch(e.target.value);
  const onSelectedCategory = (e) => {
    console.log(props.data);
    console.log(e.target.value);
    setSelectedCategory(e.target.value);
  }

  const filteredData = props.data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    ).filter((item) => selectedCategory === "all" || selectedCategory === item.category);

  let total = 0;
  let delay = 0;

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
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Australia">Australia</option>
          </Form.Select>
          <div className="Carts">
            {filteredData.map((obj) => {
              total =+ Number(obj.price);
              delay += 0.1;
              return (
                <Item
                  key={obj.id}
                  id={obj.id}
                  category={obj.category}
                  direction={props.direction}
                  name={obj.name}
                  from={obj.from}
                  material={obj.material}
                  price={obj.price}
                  obj={obj}
                  onPlus={context.onAdd}
                  delay={delay}
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
