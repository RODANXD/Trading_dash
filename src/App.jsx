import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from "@mantine/core";
import Design from './components/Design';
import Custom from './components/Dashboard1';
import Strategy from './components/Strategy';
import TradingForm from './components/Strategy2';
import Viewlegtable from './components/Viewlegtable';
import { ChartLineInteractive } from './components/Home';
import DashTable from './components/DashTable';
import Report from './components/Report';
import LoginPage from './components/login';

import './App.css';

// Function to detect Microsoft Edge
const useEdgeDetection = () => {
  useEffect(() => {
    if (navigator.userAgent.includes("Edg")) {
      document.documentElement.classList.add("edge-browser"); // Add class for Edge browser
    } else {
      document.documentElement.classList.remove("edge-browser"); // Remove if not Edge
    }
  }, []);
};

function App() {
  useEdgeDetection(); // Call Edge detection

  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/" element={<Design />}>
            <Route path="home" element={<ChartLineInteractive />} />
            <Route path="strategy" element={<Custom />} />
            <Route path="strategy2" element={<Strategy />} />
            <Route path="strategy3" element={<TradingForm />} />
            <Route path="viewlegtable" element={<Viewlegtable />} />
            <Route path="dashTable" element={<DashTable />} />
            <Route path="report" element={<Report />} />
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
