import React from 'react'
import Item from './Item'

const CartItem = (props) => {
  return (
    <>
      <h1 style={{display: 'flex', justifyContent: 'center'} }>{props.direction}</h1>
      <div className='Carts'>
        {
            props.data.map(obj=> {
                return <Item
                key={obj.id} 
                id={obj.id}
                
                from={obj.from}
                material={obj.material}
                price={obj.price}
                />
            })
        }
      </div>
    </>
  )
}

export default CartItem