import './App.css'
import CartPage from './components/CartPage'
import { Route, Routes } from 'react-router-dom'
import Header from './components/header'
import { useState, useEffect } from 'react'
import HomePage from './components/HomePage'
import axios from 'axios'
import CartItem from './components/CartItem'

function App() {
  const [data, setData] = useState([])
  const [overlay, setOverlay] = useState([])
  
  useEffect(() => {
    const getData = async () => {
      await axios.get("http://localhost:3001/tables")
      .then((res) => {
        setData(res.data)
        console.log(res.data)
      })}
      const getOverlay = async () => {
        await axios.get("http://localhost:3001/overlay")
      .then((res) => {
        setOverlay(res.data)
        console.log(res.data)
      })
      .catch((error) => console.log(error))
    }
    getData()
    getOverlay()
  }, [])

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/home/Cart' element={<CartItem direction='Table' data={data}/>}/>
        <Route path={'/home/overlay'} element={<CartItem direction='Basket' data={overlay}/>}/>
      </Routes>
    </>

  )
}

export default App
