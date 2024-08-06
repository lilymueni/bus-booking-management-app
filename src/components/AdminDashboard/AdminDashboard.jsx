import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [busFormVisible, setBusFormVisible] = useState(false);
  const [buses, setBuses] = useState([]);

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const handleAddBus = (e) => {
    e.preventDefault();
    const newBus = {
      busNumber: e.target.busNumber.value,
      seats: e.target.seats.value,
      route: e.target.route.value,
      timeOfTravel: e.target.timeOfTravel.value,
      pricePerSeat: e.target.pricePerSeat.value,
    };
    setBuses([...buses, newBus]);
    e.target.reset();
    setBusFormVisible(false);
  };

  return (
    <div className="container">
      <header>
        <h1>Admin Dashboard</h1>
        <nav>
          <div className="dropdown">
            <button className="dropbtn">Dashboard</button>
            <div className="dropdown-content">
              <a href="#" onClick={() => handleNavClick('dashboard')}>Overview</a>
              <a href="#" onClick={() => handleNavClick('analytics')}>Analytics</a>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Buses</button>
            <div className="dropdown-content">
              <a href="#" onClick={() => handleNavClick('manageBuses')}>Manage Buses</a>
              <a href="#" onClick={() => handleNavClick('addBus')}>Add Bus</a>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Schedules</button>
            <div className="dropdown-content">
              <a href="#" onClick={() => handleNavClick('manageSchedules')}>Manage Schedules</a>
              <a href="#" onClick={() => handleNavClick('viewSchedules')}>View Schedules</a>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Bookings</button>
            <div className="dropdown-content">
              <a href="#" onClick={() => handleNavClick('manageBookings')}>Manage Bookings</a>
              <a href="#" onClick={() => handleNavClick('bookingHistory')}>Booking History</a>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Users</button>
            <div className="dropdown-content">
              <a href="#" onClick={() => handleNavClick('manageUsers')}>Manage Users</a>
              <a href="#" onClick={() => handleNavClick('addUser')}>Add User</a>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Settings</button>
            <div className="dropdown-content">
              <a href="#" onClick={() => handleNavClick('profileSettings')}>Profile Settings</a>
              <a href="#" onClick={() => handleNavClick('systemSettings')}>System Settings</a>
            </div>
          </div>
        </nav>
      </header>
      <main>
        {activeSection === 'dashboard' && (
          <section id="dashboard" className="section active">
            <h2>Dashboard Overview</h2>
            <div className="overview">
              <div className="card">
                <h3>Total Buses</h3>
                <p id="total-buses">{buses.length}</p>
              </div>
              <div className="card">
                <h3>Total Bookings</h3>
                <p id="total-bookings">0</p>
              </div>
              <div className="card">
                <h3>Total Users</h3>
                <p id="total-users">0</p>
              </div>
            </div>
            <section className="recent-activities">
              <h3>Recent Activities</h3>
              <ul id="activities-list"></ul>
            </section>
          </section>
        )}

        {activeSection === 'manageBuses' && (
          <section id="buses" className="section">
            <h2>Manage Buses</h2>
            <button onClick={() => setBusFormVisible(!busFormVisible)}>Add Bus</button>
            {busFormVisible && (
              <div id="bus-form">
                <h3>Add New Bus</h3>
                <form id="bus-form-element" onSubmit={handleAddBus}>
                  <label htmlFor="bus-number">Bus Number:</label>
                  <input type="text" id="bus-number" name="busNumber" required />
                  <label htmlFor="seats">Seats:</label>
                  <input type="number" id="seats" name="seats" required />
                  <label htmlFor="route">Route:</label>
                  <input type="text" id="route" name="route" required />
                  <label htmlFor="time-of-travel">Time of Travel:</label>
                  <input type="datetime-local" id="time-of-travel" name="timeOfTravel" required />
                  <label htmlFor="price-per-seat">Price per Seat:</label>
                  <input type="number" id="price-per-seat" name="pricePerSeat" required />
                  <button type="submit">Add Bus</button>
                </form>
              </div>
            )}
            <ul id="bus-list">
              {buses.map((bus, index) => (
                <li key={index}>{`Bus Number: ${bus.busNumber}, Seats: ${bus.seats}, Route: ${bus.route}, Time: ${bus.timeOfTravel}, Price: ${bus.pricePerSeat}`}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
