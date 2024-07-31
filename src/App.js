import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePageLayout from './components/home/homepagelayout';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePageLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
