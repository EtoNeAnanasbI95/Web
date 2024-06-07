import axios from 'axios'
import CartItem from './CartItem'
import { useState, useEffect } from 'react'
import React from 'react'

const DefaultPage = () => {
    const [data, setData] = useState([])
    useEffect(() => {
      const getData = async () => {
        await axios.get("http://localhost:3001/tables")
        .then((res) => {
          setData(res.data)
          console.log(res.data)
        })
        .catch((error) => console.log(error))
      }
      getData()
    }, [])
    
    return (
      <>
        <h1>Tables</h1>
        <CartItem item={data}/>
      </>
    )
}

export default DefaultPage