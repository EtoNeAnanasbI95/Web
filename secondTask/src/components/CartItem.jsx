import React from 'react'
import Item from './Item'

const CartItem = (props) => {
  return (
    <div>
        {
            props.Item.map(obj=> {
                <Item
                key={obj.id} 
                id={obj.id}
                
                from={obj.from}
                material={obj.material}
                price={obj.price}
                />
            })
        }
    </div>
  )
}

export default CartItem