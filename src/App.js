import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/home/Layout';
import Signup from './components/auth/register/register';
import Login from './components/auth/login/login'; 
import HomePage from './components/home/homepagelayout'; 
import ContactForm from './components/ContactForm';
import ReviewForm from './components/ReviewForm';
import BookingForm from './components/BookingForm/BookingForm'; 
// import UserDashboard from './components/home/Dashboard';
import DriverDashboard from './components/DriverDashboard/DriverDashboard'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'; 
import BookTickets from './components/BookTickets/BookTickets'; // Import BookTickets component
import UserDashboard from './components/home/Dashboard';
import TermsAndConditions from './components/Termsand Conditions/TermsAndConditions';
import PrivacyPolicy from './components/Policy/PrivacyPolicy';
// import PrivateRoute from './components/PrivateRoute'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path="review" element={<ReviewForm />} />
          <Route path="print-ticket" element={<BookingForm />} />
          <Route path="cancel-booking" element={<BookingForm />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
         

          <Route path="contact-us" element={<ContactForm />} />
          {/* <Route path="home" element={<AdminDashboard/>} /> */}
        </Route>
        <Route path="home" element={<DriverDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;