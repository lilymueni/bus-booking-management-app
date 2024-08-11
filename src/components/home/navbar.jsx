import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import images from './images.jpeg';

const Navbar = () => {
  const navigate = useNavigate();

  const handleAboutUsClick = () => {
    navigate('/');
    setTimeout(() => {
      const aboutUsSection = document.getElementById('about-us');
      if (aboutUsSection) {
        aboutUsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={images} alt="TransitWise Logo" className="navbar-logo" />
        <span className="navbar-title">TransitWise</span>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <button onClick={handleAboutUsClick} className="navbar-link">About Us</button>
        <div className="navbar-dropdown">
          <button className="navbar-link">Bookings</button>
          <div className="dropdown-content">
            <Link to="/print-ticket">Print Ticket</Link>
            <Link to="/cancel-booking">Cancel Booking</Link>
          </div>
        </div>
        <Link to="/book-tickets" className="navbar-link">Book Tickets</Link>
        <Link to="/review" className="navbar-link">Reviews</Link>
        <Link to="/contact-us" className="navbar-link">Contact Us</Link>
        <Link to="/login" className="navbar-button">Log in</Link>
        <Link to="/signup" className="navbar-button">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
