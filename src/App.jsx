import { useState } from 'react'
import Design from './components/Design'
import Custom from './components/Dashboard1';
import Strategy from './components/Strategy';
import TradingForm from './components/Strategy2';
import { MantineProvider } from "@mantine/core";
import { ChartAreaStacked } from './components/Home';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MantineProvider>
      <Router>
        <Routes>
            <Route path="/" element={<Design/>}>
            <Route path="/Strategy" element={<Custom />} />
            <Route path="/home" element={<ChartAreaStacked />} />
            <Route path="/Strategy2" element={<Strategy />} />
            <Route path="/Strategy3" element={<TradingForm/>} />

            
            </Route>
        </Routes>
      </Router>
      </MantineProvider>

    </>
  )
}

export default App
