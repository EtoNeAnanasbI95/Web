import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import axios from "axios";
import CartItem from "./components/CartItem";
import Footer from "./components/footer";
import "bootstrap/dist/css/bootstrap.min.css";

export const AppContexet = React.createContext({});

function App() {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios.get("http://localhost:3001/tables").then((res) => {
        setData(res.data);
        console.log("data");
        console.log(res.data);
      });
    };
    const getOverlay = async () => {
      await axios
        .get("http://localhost:3001/basket")
        .then((res) => {
          setBasket(res.data);
          console.log("basket");
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    };
    const getFavourites = async () => {
      await axios
        .get("http://localhost:3001/favourites")
        .then((res) => {
          setFavourites(res.data);
          console.log("favourites");
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    };
    getData();
    getOverlay();
    getFavourites();
  }, []);

  const isAdded = (id, direction) => {
    console.log();
    console.log("Go isAdded function, check is added to ", direction);
    const res =
      direction == "favourites"
        ? favourites.find((objIsAdded) => {
            return Number(objIsAdded.id) === Number(id);
          })
        : basket.find((objIsAdded) => {
            return Number(objIsAdded.id) === Number(id);
          });
    let total = res ? true : false;
    console.log("Is Added?", total);
    return total;
  };

  const deleteFrom = (obj, direction) => {
    console.log();
    console.log("Go deleteFrom function, deleting from ", direction);
    const curretnObj = direction == "favourites" ? favourites : basket;
    const curretnSetter = direction == "favourites" ? setFavourites : setBasket;
    console.log("go delete from", direction);
    axios.delete(`http://localhost:3001/${direction}/${obj.id}`);
    curretnSetter(() =>
      curretnObj.filter((item) => Number(item.id) !== Number(obj.id))
    );
  };

  return (
    <AppContexet.Provider
      value={{
        data,
        setData,
        basket,
        setBasket,
        favourites,
        setFavourites,
        isAdded,
        deleteFrom,
      }}
    >
      <div>
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/home/Cart"
            element={<CartItem direction="Tables" data={data} />}
          />
          <Route
            path={"/home/overlay"}
            element={<CartItem direction="Basket" data={basket} />}
          />
          <Route
            path={"/home/favourites"}
            element={<CartItem direction="Favourites" data={favourites} />}
          />
          {/* <Route path={'/home/<О ТОВАРЕ>'} element={<CartItem direction='Favourites' data={favourites}/>}/> */}
        </Routes>
        <Footer />
      </div>
    </AppContexet.Provider>
  );
}

export default App;
