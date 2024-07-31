import React from 'react';
import './homepage.css';
import Navbar from './navbar';

const HomePageLayout = () => {
  return (
    <div className="homepage-container">
      <Navbar />
      <section className="hero-intro">
        <h2>Travel-in-Style!</h2>
        <p>Experience luxurious comfort as you travel!</p>
      </section>
      <header className="hero">
        <div className="hero-intro">
          <p className="intro-text">Experience luxurious comfort as you travel!</p>
        </div>
        <div className="hero-content">
          <img src="https://www.getbus.org/wp-content/uploads/2024/05/Website-banner9.jpg" alt="Bus" className="hero-image" />
          <h1>Welcome to TransitWise</h1>
          <p>Your journey starts here. Book, Pay, Travel with ease.</p>
        </div>
      </header>
      <section className="about-us">
        <h2>About Us</h2>
        <p>TransitWise is committed to making your travel experience seamless and enjoyable. We offer a range of services to help you book, pay, and travel with ease. Our platform is designed with your convenience in mind, ensuring that you have the best journey possible. Learn more about our features and how we can help you get where you need to go.</p>
      </section>
      <section className="booking-form">
        <h2>Book, Pay, Travel</h2>
        <form>
          <label>
            From:
            <input type="text" name="from" placeholder="Starting Point" />
          </label>
          <label>
            To:
            <input type="text" name="to" placeholder="Destination" />
          </label>
          <label>
            Date:
            <input type="date" name="date" />
          </label>
          <label>
            Search:
            <input type="text" name="search" placeholder="Search Buses" />
          </label>
          <button type="submit">Search</button>
        </form>
      </section>
      <section className="reasons">
        <div className="card">
          <h3>Reason 1</h3>
          <p>Why you should choose TransitWise.</p>
        </div>
        <div className="card">
          <h3>Reason 2</h3>
          <p>Why you should choose TransitWise.</p>
        </div>
        <div className="card">
          <h3>Reason 3</h3>
          <p>Why you should choose TransitWise.</p>
        </div>
        <div className="card">
          <h3>Reason 4</h3>
          <p>Why you should choose TransitWise.</p>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 TransitWise. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePageLayout;
