import React from 'react'

const Item = (item) => {
  return (
    <div>
        {
          data.map((item) => {
            return <>
              <h2>{item.from}</h2>
              <p>{item.material}</p>
              <p>{item.price}</p>
            </>
          })
        }
      </div>
  )
}

export default Item 