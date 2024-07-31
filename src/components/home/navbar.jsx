import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import images from "./images.jpeg"
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={images} alt="TransitWise Logo" className="navbar-logo" />
        <span className="navbar-title">TransitWise</span>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <a href="#about-us" className="navbar-link">About Us</a>
        <div className="navbar-dropdown">
          <button className="navbar-link">Bookings</button>
          <div className="dropdown-content">
            <Link to="/print-ticket">Print Ticket</Link>
            <Link to="/cancel-booking">Cancel Booking</Link>
          </div>
        </div>
        <Link to="/book-tickets" className="navbar-link">Book Tickets</Link>
        <Link to="/contact-us" className="navbar-link">Contact Us</Link>
        <Link to="/login" className="navbar-button">Log in</Link>
        <Link to="/signup" className="navbar-button">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
