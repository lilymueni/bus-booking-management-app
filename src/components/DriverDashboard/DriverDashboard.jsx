import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DriverDashboard.css';

const DriverDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [buses, setBuses] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [busDetails, setBusDetails] = useState({
    driver_id: '', 
    number_plate: '',
    number_of_seats: '',
    departure_from: '',
    departure_to: '',
    departure_time: '',
    arrival_time: '',
    price_per_seat: ''
  });
  const [busIdToDelete, setBusIdToDelete] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('https://bus-booking-management-system1.onrender.com/buses');
        setBuses(response.data);
      } catch (error) {
        console.error('Error fetching buses:', error);
      }
    };

    fetchBuses();
  }, []);

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const handleAddBus = async (e) => {
    e.preventDefault();

    // Prepare the data to match backend expectations
    const newBus = {
      driver_id: busDetails.driver_id,
      number_plate: busDetails.number_plate,
      number_of_seats: busDetails.number_of_seats,
      seats_available: busDetails.number_of_seats, 
      departure_from: busDetails.departure_from,
      departure_to: busDetails.departure_to,
      departure_time: busDetails.departure_time,
      arrival_time: busDetails.arrival_time,
      price_per_seat: busDetails.price_per_seat
    };

    try {
      const response = await axios.post('https://bus-booking-management-system1.onrender.com/buses', newBus);
      console.log('Bus added:', response.data);
      setBuses([...buses, response.data]);
      setBusDetails({
        driver_id: '',
        number_plate: '',
        number_of_seats: '',
        departure_from: '',
        departure_to: '',
        departure_time: '',
        arrival_time: '',
        price_per_seat: ''
      });
      setResponseMessage ('BUS ADDED SUCCESSFULLY!')
    } catch (error) {
      console.error('Error adding bus:', error);
    }
  };

  const handleDeleteBus = async (busId) => {
    try {
      await axios.delete(`https://bus-booking-management-system1.onrender.com/buses/${busId}`);
      console.log('Bus deleted:', busId);
      setBuses(buses.filter(bus => bus.id !== busId));
    } catch (error) {
      console.error('Error deleting bus:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('userSession');
    document.cookie = 'authToken=; Max-Age=0; path=/;';
    navigate('/login');
  };

  return (
    <div>
      <div className="navbar">
        <h2>Driver Dashboard</h2>
        <ul>
          <li onClick={() => handleNavClick('addBus')}>Add Bus</li>
          <li onClick={() => handleNavClick('deleteBus')}>Delete Bus</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      <div className="content">
        {activeSection === 'addBus' && (
          <div className="form-section">
            <h2>Add New Bus</h2>
            <form onSubmit={handleAddBus}>
              <div className="form-group">
                <label htmlFor="driver-id">Driver ID:</label>
                <input
                  type="text"
                  id="driver-id"
                  name="driver_id"
                  value={busDetails.driver_id}
                  onChange={(e) => setBusDetails({ ...busDetails, driver_id: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="number-plate">Number Plate:</label>
                <input
                  type="text"
                  id="number-plate"
                  name="number_plate"
                  value={busDetails.number_plate}
                  onChange={(e) => setBusDetails({ ...busDetails, number_plate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="seats">Number of Seats:</label>
                <input
                  type="number"
                  id="seats"
                  name="number_of_seats"
                  value={busDetails.number_of_seats}
                  onChange={(e) => setBusDetails({ ...busDetails, number_of_seats: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="departure-from">Departure From:</label>
                <input
                  type="text"
                  id="departure-from"
                  name="departure_from"
                  value={busDetails.departure_from}
                  onChange={(e) => setBusDetails({ ...busDetails, departure_from: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="departure-to">Departure To:</label>
                <input
                  type="text"
                  id="departure-to"
                  name="departure_to"
                  value={busDetails.departure_to}
                  onChange={(e) => setBusDetails({ ...busDetails, departure_to: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="departure-time">Departure Time:</label>
                <input
                  type="datetime-local"
                  id="departure-time"
                  name="departure_time"
                  value={busDetails.departure_time}
                  onChange={(e) => setBusDetails({ ...busDetails, departure_time: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="arrival-time">Arrival Time:</label>
                <input
                  type="datetime-local"
                  id="arrival-time"
                  name="arrival_time"
                  value={busDetails.arrival_time}
                  onChange={(e) => setBusDetails({ ...busDetails, arrival_time: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price-per-seat">Price per Seat:</label>
                <input
                  type="number"
                  id="price-per-seat"
                  name="price_per_seat"
                  value={busDetails.price_per_seat}
                  onChange={(e) => setBusDetails({ ...busDetails, price_per_seat: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Add Bus</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
          </div>
        )}

        {activeSection === 'deleteBus' && (
          <div className="form-section">
            <h2>Delete Bus</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleDeleteBus(busIdToDelete); }}>
              <div className="form-group">
                <label htmlFor="delete-bus-id">Bus ID:</label>
                <input
                  type="text"
                  id="delete-bus-id"
                  name="busId"
                  value={busIdToDelete}
                  onChange={(e) => setBusIdToDelete(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Delete Bus</button>
            </form>

            {/* Display Buses for Deletion */}
            <div className="bus-list">
              <h3>Available Buses for Deletion</h3>
              <ul>
                {buses.map(bus => (
                  <li key={bus.id}>
                    {`Bus ID: ${bus.id}, Number Plate: ${bus.number_plate}, Route: ${bus.departure_from} to ${bus.departure_to}, Time: ${bus.departure_time} to ${bus.arrival_time}`}
                    <button onClick={() => handleDeleteBus(bus.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
