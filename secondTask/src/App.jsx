import './App.css'
import DefaultPage from './components/DefaultPage'
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <>
      <Routes>
        <Route path='/Home' element={<DefaultPage/>}/>
      </Routes>
    </>

  )
}

export default App
