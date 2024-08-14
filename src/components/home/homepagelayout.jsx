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
  
  <section className="services">
    <h2>Our Services</h2>
  <div className="service-item">
    
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrfkW-DfQCAUPXRMbcj6sr7lG0AWedXJh617MkxATeuNbqX9D1W50JEutzwydbMHwznto&usqp=CAU" // Replace with actual high-res URL
      alt="Parcel Service"
      className="service-image"
    />
    <div className="service-text">
      <h3>Parcel Service</h3>
      <p>
        Our reliable parcel service ensures that your packages are delivered
        safely and on time, with tracking options available.
      </p>
    </div>
  </div>

  <div className="service-item">
    <div className="service-text">
      <h3>Fleet Service</h3>
      <p>
        We provide a wide range of modern and well-maintained vehicles to ensure
        a safe and comfortable journey for our passengers.
      </p>
    </div>
    <img
      src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQERISEhAWFRUXFhUYFRcYGBcaGBUYGBYXFxUYFRYYHyglGBolGxUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0mICU3Ky0tLy0tMC8tLy0vLS4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQECAwQGBwj/xABJEAACAQMCAgYHAwkFBQkAAAABAgADBBESIQUxBhMiQVFxBzJhgZGhsRRCciNDUpKywdHh8DNigqLCCBVzk7MXJDRUg6PD4vH/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBAUG/8QANxEBAAIBAgQDBQcDAwUAAAAAAAECAwQREiExQQVRYRMUcZGhIjJSgbHR4SNCwTNi8BUkQ3KS/9oADAMBAAIRAxEAPwD2qAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUgICAgICAgIFYCAgICAgICAgICAgICAgICAgICAgICAgUgICAgICAgICAgICAgICBWAgICAgICAgICAgICAgICAgICAgIFICAgICAgICAgICAgICBWAgICAgICAgIFICAgICBWAgICAgICBSAgVgICBSAgICAgVx7IDSfCBSAgICBWAgICAgIFICBY9VV5sB5kD6wLlIPI58oFcQECsBAQECjEAEk4A5nwiZ26jm+O9LRQ2o2z1zj1tdKnSHsNSo2T/hVpye/YO1t/hzb+75O8bOL4n6Tb2kATRsVzyHXtUPvKYA5H4GXx6muT7tbfJW2Ga9Zj5tKj6X7v71vZt5VmT9rM09p6T8leD1hIWPpgYnFTh4P/BuqNQ/qHSfnHtax1/Q4JdLw30lcPq4FR6lqx7rhCg/5gyn+aWi9Z6SrNZjq66lVV1DKwZTuCCCCPYRzlkL4CBrX1/SoLqrVUpjxdgv1kTaI6y0x4cmSdqVmfg0rPpBQro9Sk2tFOkvjSme/DNjVzG4yJFbxbotm098M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" 
      alt="Fleet Service"
      className="service-image"
    />
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

<section id="about-us" className="about-us">
        <h2>About Us</h2>
        <p>TransitWise is committed to making your travel experience seamless and enjoyable. We offer a range of services to help you book, pay, and travel with ease. Our platform is designed with your convenience in mind, ensuring that you have the best journey possible. Learn more about our features and how we can help you get where you need to go. We strive to provide exceptional customer service and support, ensuring your needs are met every step of the way. Our user-friendly interface makes it easy to plan and manage your trips efficiently. With TransitWise, you can travel with confidence, knowing that we prioritize your safety and comfort.</p>
      </section>
      
</div>

<footer className="footer">
  <p>&copy; 2024 TransitWise. All rights reserved.</p>
  <div>
    <button 
      className="footer-button" 
      onClick={() => window.location.href = '/terms-and-conditions'}>
      Terms & Conditions
    </button>
    <span> || </span>
    <button 
      className="footer-button" 
      onClick={() => window.location.href = '/privacy-policy'}>
      Policy
    </button>
  </div>
  <p>Booking offices</p>
</footer>

    </div>
  );
};

export default HomePageLayout;
