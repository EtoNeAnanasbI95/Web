import React from 'react'
import Item from './Item'
import axios from 'axios'
import { AppContexet } from '../App'
import 'bootstrap/dist/css/bootstrap.min.css'

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
  console.log(props)
  let total = ""
  return (
    <>
    {
      props.direction === "Basket" && props.data.length == 0 ? <h1 style={{display: 'flex', justifyContent: 'center'}}> Basket is empty</h1> : (
        <div>
          <h1 style={{display: 'flex', justifyContent: 'center'}}>{props.direction}</h1>
          <div className='Carts'>
            {
              props.data.map(obj => {
                total += obj.price
                return (
                  <Item
                  key={obj.id} 
                  id={obj.id}

                  direction={props.direction}
                  
                  name={obj.name}
                  from={obj.from}
                  material={obj.material}
                  price={obj.price}

                  onPlus={(cartObj) => onAddBasket(cartObj)}
                  />
                )
              })
            }
          </div>
        </div>
      )
    }
    {
      props.direction == "Basket" ? <h2 style={{display: 'flex', justifyContent: 'center', 'margin-top': '10rem'}}>Total: {total}</h2> : ""
    }
    </>
  )
}

export default CartItem