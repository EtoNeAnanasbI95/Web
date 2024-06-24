import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import axios from "axios";
import CartItem from "./components/CartItem";
import Footer from "./components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutOfItem from "./components/AboutOfItem";
import FeedbackForm from "./components/FeedbackForm";

export const AppContexet = React.createContext({});

function App() {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [aboutItem, setAboutItam] = useState([]);

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

  const onAdd = (obj, direction) => {
    console.log();
    console.log("onAdd hendler");
    console.log("curr dir", direction);
    console.log("cur obj", obj);
    const currentObj =
      direction == "favourites" ? favourites : basket;
    const currentSetter =
      direction == "favourites" ? setFavourites : setBasket;
    try {
      if (currentObj.find((item) => Number(item.id) === Number(obj.id))) {
        deleteFrom(obj, direction.toLowerCase());
      } else {
        console.log("go post");
        axios.post(`http://localhost:3001/${direction.toLowerCase()}`, obj);
        currentSetter([...currentObj, obj]);
      }
    } catch (Error) {
      alert(`Something went error ${Error}`);
    }
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
        aboutItem,
        setAboutItam,
        onAdd
      }}
    >
      <Header />
      <div className="content">
        <Routes>
          <Route path="/home" element={<HomePage data={data} direction="Tables" />} />
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
          <Route
            path={"/home/AboutOf"}
            element={<AboutOfItem direction="About?" item={aboutItem} />}
          />
        </Routes>
      </div>
      <FeedbackForm />
      <Footer />
    </AppContexet.Provider>
  );
}

export default App;
