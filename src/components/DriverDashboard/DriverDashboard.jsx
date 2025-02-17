import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DriverDashboard.css';
import images from './images.jpeg';

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
  const [busIdToEdit, setBusIdToEdit] = useState('');
  const [isEditing, setIsEditing] = useState(false);
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
      // Add the bus to the system
      const response = await axios.post('https://bus-booking-management-system1.onrender.com/buses', newBus);
      const addedBus = response.data;
      console.log('Bus added:', addedBus);
  
      // Get the bus ID from the response
      const busId = addedBus.id;
  
      // Generate and post seat numbers one by one
      for (let i = 1; i <= busDetails.number_of_seats; i++) {
        const seatNumber = `S${i}`;
        try {
          await axios.post('https://bus-booking-management-system1.onrender.com/seats', {
            bus_id: busId,
            seat_number: seatNumber,
            status: 'available'
          });
          console.log(`Seat ${seatNumber} added successfully.`);
        } catch (seatError) {
          console.error(`Error adding seat ${seatNumber}:`, seatError);
          setResponseMessage(`Error adding seat ${seatNumber}.`);
          return; // Optionally stop processing if you want to halt on the first error
        }
      }
  
      // Update state and response message
      setBuses([...buses, addedBus]);
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
      setResponseMessage('BUS ADDED SUCCESSFULLY AND SEATS GENERATED!');
    } catch (error) {
      console.error('Error adding bus:', error);
      setResponseMessage('Error adding bus. Please try again.');
    }
  };
  

  const handleEditBus = async (busId) => {
    try {
      const response = await axios.get(`https://bus-booking-management-system1.onrender.com/buses/${busId}`);
      setBusDetails(response.data);
      setBusIdToEdit(busId);
      setIsEditing(true);
      setActiveSection('addBus');  
    } catch (error) {
      console.error('Error fetching bus details for editing:', error);
    }
  };

  const handleUpdateBus = async (e) => {
    e.preventDefault();

    const updatedBus = {
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
      await axios.patch(`https://bus-booking-management-system1.onrender.com/buses/${busIdToEdit}`, updatedBus);
      console.log('Bus updated:', updatedBus);
      setBuses(buses.map(bus => bus.id === busIdToEdit ? updatedBus : bus));
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
      setIsEditing(false);
      setResponseMessage('BUS UPDATED SUCCESSFULLY!');
    } catch (error) {
      console.error('Error updating bus:', error);
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
          <img src={images} alt="TransitWise Logo" className="navbar-logo" />
          <h2>TransitWise</h2>
          <ul>
            <li className="navbar-button" onClick={() => handleNavClick('dashboard')}>Home</li>
            <li className="navbar-button" onClick={() => handleNavClick('addBus')}>Add Bus</li>
            <li className="navbar-button" onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </nav>

      <div className="content">
        {activeSection === 'dashboard' && (
          <div className="dashboard-section">
            <h1>Welcome to Driver Dashboard</h1>
            <p>Easily manage your buses—add new ones, update schedules, or delete existing buses. We're here to support your journey. Thank you for being a crucial part of our team!</p>
            
            
            <div className="additional-images">
            
            </div>
          </div>
        )}

        {activeSection === 'addBus' && (
          <div className="form-section">
            <h2>{isEditing ? 'Edit Bus' : 'Add New Bus'}</h2>
            <form onSubmit={isEditing ? handleUpdateBus : handleAddBus}>
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
              <button type="submit" className="submit-button navbar-button">
                {isEditing ? 'Update Bus' : 'Add Bus'}
              </button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
          </div>
        )}

        {/* Always display the bus management section below the welcome section */}
        {activeSection !== 'addBus' && (
          <div className="bus-management-section">
            <h2>Manage Buses</h2>
            <table className="bus-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Number Plate</th>
                  <th>Seats</th>
                  <th>Departure From</th>
                  <th>Departure Time</th>


                  <th>Arrival At</th>
                  <th>Arrival Time</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {buses.map(bus => (
                  <tr key={bus.id}>
                    <td>{bus.id}</td>
                    <td>{bus.number_plate}</td>
                    <td>{bus.number_of_seats}</td>
                    <td>{bus.departure_from}</td>

                    <td>{bus.departure_time}</td>
                    <td>{bus.departure_to}</td>
                    <td>{bus.arrival_time}</td>
                    <td>${bus.price_per_seat}</td>
                    <td>
                      <button className="navbar-button" onClick={() => handleEditBus(bus.id)}>Edit</button>
                      <button className="navbar-button" onClick={() => handleDeleteBus(bus.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> 
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
