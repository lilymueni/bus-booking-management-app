import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/auth/register/register';
import Login from './components/auth/login/login'; 
import HomePage from './components/home/homepagelayout'; 
import BookingForm from './components/BookingForm/BookingForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/print-ticket" element={<BookingForm />} />
        <Route path="/cancel-booking" element={<BookingForm />} />
        
      </Routes>
    </Router>
  );
}

export default App;