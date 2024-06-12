import CartItem from './CartItem'
import React from 'react'

const CartPage = (props) => {
    return (
      <>
        <h1>{props.direction}</h1>
        <CartItem item={props.data}/>
      </>
    )
}

export default CartPage