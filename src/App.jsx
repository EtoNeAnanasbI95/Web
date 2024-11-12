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
    baseURL: 'https://notpineapples.zapto.org/',
    insecure: true
  })

  useEffect(() => {
    const getData = async () => {
      await api.get("/tables").then((res) => {
        setData(res.data);
      });
    };
    const getOverlay = async () => {
      await api
        .get("/basket")
        .then((res) => {
          setBasket(res.data);
        })
        .catch((error) => console.log(error));
    };
    const getFavourites = async () => {
      await api
        .get("/favourites")
        .then((res) => {
          setFavourites(res.data);
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
    const res =
      direction == "favourites"
        ? favourites.find((objIsAdded) => {
            return Number(objIsAdded.id) === Number(id);
          })
        : basket.find((objIsAdded) => {
            return Number(objIsAdded.id) === Number(id);
          });
    let total = res ? true : false;
    return total;
  };

  const onAdd = (obj, direction) => {
    const currentObj =
      direction == "favourites" ? favourites : basket;
    const currentSetter =
      direction == "favourites" ? setFavourites : setBasket;
    try {
      if (currentObj.find((item) => Number(item.id) === Number(obj.id))) {
        deleteFrom(obj, direction.toLowerCase());
      } else {
        api.post(`/${direction.toLowerCase()}`, obj);
        currentSetter([...currentObj, obj]);
      }
    } catch (Error) {
      alert(`Something went error ${Error}`);
    }
  };

  const deleteFrom = (obj, direction) => {
    const curretnObj = direction == "favourites" ? favourites : basket;
    const curretnSetter = direction == "favourites" ? setFavourites : setBasket;
    api.delete(`/${direction}/${obj.id}`);
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
