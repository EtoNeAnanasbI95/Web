import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3001/tables")
    .then((res) => setData(res.data))
    .catch((error) => console.log(error))
  }, [])
  

  return (
    <>
      <h1>Tables</h1>
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
    </>
  )
}

export default App
