import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Landing } from './screens/Landing';
import { StartGame } from './screens/StartGame';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen bg-black'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/game" element={<StartGame/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
