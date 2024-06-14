import React from 'react'
import Item from './Item'
import axios from 'axios'
import { AppContexet } from '../App'

const CartItem = (props) => {

  const context = React.useContext(AppContexet)

  const onAddBasket = (obj) => {
    try {
      if (context.basket.find(item => Number(item.id) === Number(obj.id))) {
        context.deleteFromBasket(obj)
      } else {
        console.log("go post")
        axios.post('http://localhost:3001/basket', obj)
        context.setBasket([...context.basket, obj])
      }
    } catch (Error) {
      alert(`Something went error ${Error}`)
    }
  }

  return (
    <>
      <h1 style={{display: 'flex', justifyContent: 'center'} }>{props.direction}</h1>
      <div className='Carts'>
        {
            props.data.map(obj => {
                return (
                  <Item
                  key={obj.id} 
                  id={obj.id}
                  
                  from={obj.from}
                  material={obj.material}
                  price={obj.price}

                  onPlus={(cartObj) => onAddBasket(cartObj)}
                  />
                )
            })
        }
      </div>
    </>
  )
}

export default CartItem