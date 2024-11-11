import "./App.css";
import { Route, Routes  } from "react-router-dom";
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

  const api = axios.create({
    baseURL: 'http://93.183.69.250:3000',
    insecure: true
  })

  useEffect(() => {
    const getData = async () => {
      await api.get("/tables").then((res) => {
        setData(res.data);
        console.log("data");
        console.log(res.data);
      });
    };
    const getOverlay = async () => {
      await api
        .get("/basket")
        .then((res) => {
          setBasket(res.data);
          console.log("basket");
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    };
    const getFavourites = async () => {
      await api
        .get("/favourites")
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

  const animations = {
    rest: {
      scale: 1,
    },
    pressed: {
      scale: 0.99,
    },
    popupHover: {
      scale: 1.1,
    },
    popupPressed: {
      scale: [2, 1, 1.2, 1.1],
      transition: {
        duration: 0.3,
      },
    },
    bounce: {
      scale: [1, 1.2, 0.9, 1.1, 1],
      transition: {
        duration: 0.3,
      },
    },
  };

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
        axios.post(`http://194.28.225.8:5000/${direction.toLowerCase()}`, obj);
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
    axios.delete(`http://194.28.225.8:5000/${direction}/${obj.id}`);
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
        onAdd,
        animations
      }}
    >
      <Header />
      <div className="content">
        <Routes>
          <Route path="/Web" element={<HomePage data={data} direction="Tables" />} />
          <Route
            path="/Web/Cart"
            element={<CartItem direction="Tables" data={data} />}
          />
          <Route
            path={"/Web/overlay"}
            element={<CartItem direction="Basket" data={basket} />}
          />
          <Route
            path={"/Web/favourites"}
            element={<CartItem direction="Favourites" data={favourites} />}
          />
          <Route
            path={"/Web/AboutOf"}
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
