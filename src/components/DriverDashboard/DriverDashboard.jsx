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
      setResponseMessage('BUS ADDED SUCCESSFULLY!');
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
      <nav>
        <div className="navbar">
          <h2>TransitWise</h2>
          <ul>
            <li className="navbar-button" onClick={() => handleNavClick('addBus')}>Add Bus</li>
            <li className="navbar-button" onClick={() => handleNavClick('deleteBus')}>Delete Bus</li>
            <li className="navbar-button" onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </nav>

      <div className="content">
        {activeSection === 'dashboard' && (
          <div className="dashboard-section">
            <h1>Welcome to Driver Dashboard</h1>
            <p>Here you can manage your buses, add new ones, and delete existing ones.</p>
            <div className="dashboard-image">
              <img src="data:image/jpeg;base64,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" alt="Driver Dashboard" />
            </div>
          </div>
        )}

        {activeSection === 'addBus' && (
          <div className="form-section">
            <h2>Add New Bus</h2>
            <form onSubmit={handleAddBus}>
              {Object.keys(busDetails).map((key) => (
                <div className="form-group" key={key}>
                  <label htmlFor={key}>{key.replace(/_/g, ' ').toUpperCase()}:</label>
                  <input
                    type={key.includes('time') ? 'datetime-local' : key.includes('seat') ? 'number' : 'text'}
                    id={key}
                    name={key}
                    value={busDetails[key]}
                    onChange={(e) => setBusDetails({ ...busDetails, [key]: e.target.value })}
                    required
                  />
                </div>
              ))}
              <button type="submit" className="submit-button navbar-button">Add Bus</button>
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
              <button type="submit" className="submit-button navbar-button">Delete Bus</button>
            </form>

            <div className="bus-list">
              <h3>Available Buses for Deletion</h3>
              <ul>
                {buses.map(bus => (
                  <li key={bus.id}>
                    {`Bus ID: ${bus.id}, Number Plate: ${bus.number_plate}, Route: ${bus.departure_from} to ${bus.departure_to}, Time: ${bus.departure_time} to ${bus.arrival_time}`}
                    <button className="navbar-button" onClick={() => handleDeleteBus(bus.id)}>Delete</button>
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
