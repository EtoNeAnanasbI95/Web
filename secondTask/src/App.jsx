import './App.css'
import CartPage from './components/CartPage'
import { Route, Routes } from 'react-router-dom'
import Header from './components/header'
import React, { useState, useEffect } from 'react'
import HomePage from './components/HomePage'
import axios from 'axios'
import CartItem from './components/CartItem'

export const AppContexet = React.createContext({})

function App() {
  const [data, setData] = useState([])
  const [basket, setBasket] = useState([])
  
  useEffect(() => {
    const getData = async () => {
      await axios.get("http://localhost:3001/tables")
      .then((res) => {
        setData(res.data)
        console.log("data")
        console.log(res.data)
      })}
      const getOverlay = async () => {
        await axios.get("http://localhost:3001/basket")
      .then((res) => {
        setBasket(res.data)
        console.log("basket")
        console.log(res.data)
      })
      .catch((error) => console.log(error))
    }
    getData()
    getOverlay()
  }, [])

  const isAdded = (id) => {
    const res = basket.find((objIsAdded) => {
      return Number(objIsAdded.id) === Number(id);
    });
    let total = res ? true : false;
    console.log("Добавлен?", total);
    return total;
  }

  const deleteFromBasket = (obj) => {
    console.log("go delete")
    axios.delete(`http://localhost:3001/basket/${obj.id}`)
    setBasket(() => basket.filter(item => Number(item.id) !== Number(obj.id)))
  }

  return (
    <AppContexet.Provider
    value={{
      data,
      setData,
      basket,
      setBasket,
      isAdded,
      deleteFromBasket
    }}>
      <>
        <Header/>
        <Routes>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/home/Cart' element={<CartItem direction='Tables' data={data}/>}/>
          <Route path={'/home/overlay'} element={<CartItem direction='Basket' data={basket}/>}/>
        </Routes>
      </>
    </AppContexet.Provider>
  )
}

export default App
