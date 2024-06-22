// eslint-disable-next-line no-unused-vars
import React from "react";
import "../App.css";
import Item from "./Item";

const HomePage = (props) => {
  console.log("Home page props log");
  console.log(props);
  const items = props.data.slice(0, 10);

  return (
    <div className="text-center">
      <h1>Home page</h1>
      <h2>This is a humble furniture store called NotPineapple shop</h2>
      <p>And it has the following popular items:</p>
      <div className="Carts">
        {
          items.map((obj) => {
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
              />
            )
          })
        }
      </div>
    </div>
  );
};

export default HomePage;
