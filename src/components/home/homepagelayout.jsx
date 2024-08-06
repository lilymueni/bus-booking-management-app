import React from 'react';
import './homepage.css';
import Navbar from './navbar';

const HomePageLayout = () => {
  return (
    <div className="homepage-container">
      <nav>
        <Navbar />
      </nav>
      <section className="hero-intro">
        <h2>Travel-in-Style!</h2>
        <p>Experience luxurious comfort as you travel!</p>
      </section>
      <header className="hero">
        <div className="hero-content">
          <img src="https://media.istockphoto.com/id/1472071952/vector/electric-city-bus-charging-station-with-green-city-city-building-in-background-vector.jpg?s=612x612&w=0&k=20&c=mpWPr_3_9YAlQIQ4EArllVY910o9lb3yMtbEUo7kcyo=" />
        </div>
      </header>
     
      
      <div className="centered-text">
  <h2>Your Trusted Travel Partner!</h2>


    
  <section className="reasons">
    <div className="card">
      <br /><br />
      <img src="https://www.shutterstock.com/image-vector/best-price-icon-logo-isolated-600nw-2240243187.jpg" alt="Affordable" style={{width: '160px', height: '160px'}} />
      <br /><br /><br /><br />
      <h3>AFFORDABLE</h3>
      <br />
      <p>We offer unbeatable prices that provide the best value for your money.<br />
      Save more with our cost-effective travel solutions.</p>
    </div>
    <div className="card">
      <img src="https://media.istockphoto.com/id/956955682/vector/stopwatch-in-motion-line-icon.jpg?s=612x612&w=0&k=20&c=ouraifW3pOIPHEMtLnzGReBCjkmzoY6ZHtwGmBDvj8E=" alt="timely" style={{width: '240px', height: '240px'}} />
      <h3>TIMELY</h3>
      <br />
      <p>We understand the importance of your time.<br />
      Our services ensure prompt departures and arrivals, keeping you on schedule.</p>
    </div>
    <div className="card">
      <br /><br />
      <img src="https://www.freeiconspng.com/thumbs/wifi-icon/3d-black-wifi-icon-9.png" alt="wifi" style={{width: '120px', height: '120px'}} />
      <br /><br /><br /><br /><br />
      <h3>COMFORT</h3>
      <br />
      <p>Our coaches are top-of-the-line and regularly maintained.<br />
      Enjoy super-comfortable seats and free WiFi for a pleasant journey.</p>
    </div>
    <div className="card">
      <br />
      <img src="https://static.thenounproject.com/png/2389124-200.png" alt="comfort" style={{width: '140px', height: '140px'}} />
      <br /><br /><br /><br /><br />
      <h3>LUXURIOUS</h3>
      <br />
      <p>Travel in style with our luxurious coaches equipped with modern amenities.<br />
      Experience premium comfort and top-notch service on every trip.</p>
    </div>
  </section>
  {/* <section className="booking-form">
  <h1> Hasssle-Free Booking...</h1>
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
</section> */}

  <section className="about-us">
        <h2>About Us</h2>
        <p>TransitWise is committed to making your travel experience seamless and enjoyable. We offer a range of services to help you book, pay, and travel with ease. Our platform is designed with your convenience in mind, ensuring that you have the best journey possible. Learn more about our features and how we can help you get where you need to go. We strive to provide exceptional customer service and support, ensuring your needs are met every step of the way. Our user-friendly interface makes it easy to plan and manage your trips efficiently. With TransitWise, you can travel with confidence, knowing that we prioritize your safety and comfort.</p>
      </section>
      
</div>

      <footer className="footer">
        <p>&copy; 2024 TransitWise. All rights reserved.</p>
        <p>Terms & Conditions||Policy</p>
        <p>Booking offices</p>
      </footer>
    </div>
  );
};

export default HomePageLayout;
