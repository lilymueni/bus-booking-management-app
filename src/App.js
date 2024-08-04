import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/home/Layout';
import Signup from './components/auth/register/register';
import Login from './components/auth/login/login'; 
import HomePage from './components/home/homepagelayout'; 
import ContactForm from './components/ContactForm';
import ReviewForm from './components/ReviewForm';

import PrivateRoute from './components/PrivateRoute'; // Import your custom PrivateRoute component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path="review" element={<ReviewForm />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="contact-us" element={<ContactForm />} />
        </Route>
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact-us" element={<ContactForm />} />
        {/* Use PrivateRoute for protected routes */}
        {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> Example protected route */} 
      </Routes>
    </Router>
  );
}

export default App;
