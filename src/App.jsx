import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from "@mantine/core";
import Design from './components/Design';
import Custom from './components/Dashboard1';
import Strategy from './components/Strategy';
import TradingForm from './components/Strategy2';
import Viewlegtable from './components/Viewlegtable';
import {ChartLineInteractive} from './components/Home';
import DashTable from './components/DashTable';
import Report from './components/Report';
import LoginPage from './components/login';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
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