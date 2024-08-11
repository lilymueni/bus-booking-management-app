import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DriverDashboard.css'; 

const DriverDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [buses, setBuses] = useState([]);
  const [scheduledBuses, setScheduledBuses] = useState([]);
  const [busDetails, setBusDetails] = useState({
    busNumber: '',
    seats: '',
    route: '',
    travelTime: '',
    cost: ''
  });
  const [busNumberToDelete, setBusNumberToDelete] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [schedulingDetails, setSchedulingDetails] = useState({
    busNumber: '',
    route: '',
    travelTime: ''
  });
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing buses and scheduled buses from the backend
    axios.get('http://localhost:5555/buses')
      .then(response => setBuses(response.data))
      .catch(error => console.error('Error fetching buses:', error));

    axios.get('http://localhost:5555/scheduled-buses')
      .then(response => setScheduledBuses(response.data))
      .catch(error => console.error('Error fetching scheduled buses:', error));
  }, []);

  const handleNavClick = (section) => {
    setActiveSection(section);
    setMessage(''); // Clear message when navigating to a new section
  };

  const handleAddBus = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/buses', busDetails);
      setBuses([...buses, response.data]);
      setBusDetails({
        busNumber: '',
        seats: '',
        route: '',
        travelTime: '',
        cost: ''
      });
      setMessage('BUS ADDED SUCCESSFULLY');
    } catch (error) {
      console.error('Error adding bus:', error);
      setMessage('ERROR ADDING BUS');
    }
  };

  const handleScheduleBus = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/scheduled-buses', schedulingDetails);
      setScheduledBuses([...scheduledBuses, response.data]);
      setSchedulingDetails({
        busNumber: '',
        route: '',
        travelTime: ''
      });
      setMessage('BUS SCHEDULED SUCCESSFULLY');
    } catch (error) {
      console.error('Error scheduling bus:', error);
      setMessage('ERROR SCHEDULING BUS');
    }
  };

  const handleDeleteBus = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5555/buses/${busNumberToDelete}`);
      setBuses(buses.filter(bus => bus.busNumber !== busNumberToDelete));
      setScheduledBuses(scheduledBuses.filter(bus => bus.busNumber !== busNumberToDelete));
      setBusNumberToDelete('');
      setMessage('BUS DELETED SUCCESSFULLY');
    } catch (error) {
      console.error('Error deleting bus:', error);
      setMessage('ERROR DELETING BUS');
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
          <li onClick={() => handleNavClick('scheduleBus')}>Schedule Bus</li>
          <li onClick={() => handleNavClick('deleteBus')}>Delete Bus</li>
          <li onClick={() => handleNavClick('search')}>Search</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      <div className="content">
        {/* Notification Message */}
        {message && (
          <div className="notification">
            <p>{message}</p>
          </div>
        )}

        {activeSection === 'addBus' && (
          <div className="form-section">
            <h2>Add New Bus</h2>
            <form onSubmit={handleAddBus}>
              <div className="form-group">
                <label htmlFor="bus-number">Bus Number:</label>
                <input
                  type="text"
                  id="bus-number"
                  name="busNumber"
                  value={busDetails.busNumber}
                  onChange={(e) => setBusDetails({ ...busDetails, busNumber: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="seats">Seats:</label>
                <input
                  type="number"
                  id="seats"
                  name="seats"
                  value={busDetails.seats}
                  onChange={(e) => setBusDetails({ ...busDetails, seats: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="route">Route:</label>
                <input
                  type="text"
                  id="route"
                  name="route"
                  value={busDetails.route}
                  onChange={(e) => setBusDetails({ ...busDetails, route: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="travel-time">Time of Travel:</label>
                <input
                  type="datetime-local"
                  id="travel-time"
                  name="travelTime"
                  value={busDetails.travelTime}
                  onChange={(e) => setBusDetails({ ...busDetails, travelTime: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cost">Cost of Trip:</label>
                <input
                  type="number"
                  id="cost"
                  name="cost"
                  value={busDetails.cost}
                  onChange={(e) => setBusDetails({ ...busDetails, cost: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Add Bus</button>
            </form>
          </div>
        )}

        {activeSection === 'scheduleBus' && (
          <div className="form-section">
            <h2>Schedule Bus</h2>
            <form onSubmit={handleScheduleBus}>
              <div className="form-group">
                <label htmlFor="schedule-bus-number">Bus Number:</label>
                <input
                  type="text"
                  id="schedule-bus-number"
                  name="busNumber"
                  value={schedulingDetails.busNumber}
                  onChange={(e) => setSchedulingDetails({ ...schedulingDetails, busNumber: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="schedule-route">Route:</label>
                <input
                  type="text"
                  id="schedule-route"
                  name="route"
                  value={schedulingDetails.route}
                  onChange={(e) => setSchedulingDetails({ ...schedulingDetails, route: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="schedule-travel-time">Time of Travel:</label>
                <input
                  type="datetime-local"
                  id="schedule-travel-time"
                  name="travelTime"
                  value={schedulingDetails.travelTime}
                  onChange={(e) => setSchedulingDetails({ ...schedulingDetails, travelTime: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Schedule Bus</button>
            </form>
          </div>
        )}

        {activeSection === 'deleteBus' && (
          <div className="form-section">
            <h2>Delete Bus</h2>
            <form onSubmit={handleDeleteBus}>
              <div className="form-group">
                <label htmlFor="delete-bus-number">Bus Number:</label>
                <input
                  type="text"
                  id="delete-bus-number"
                  name="busNumber"
                  value={busNumberToDelete}
                  onChange={(e) => setBusNumberToDelete(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Delete Bus</button>
            </form>

            {/* Display Buses for Deletion */}
            <div className="bus-list">
              <h3>Available Buses for Deletion</h3>
              <ul>
                {[...buses, ...scheduledBuses].map(bus => (
                  <li key={bus.busNumber}>{`Bus Number: ${bus.busNumber}, Route: ${bus.route}, Time: ${bus.travelTime}`}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeSection === 'search' && (
          <div className="form-section">
            <h2>Search Buses</h2>
            <input
              type="text"
              placeholder="Search by route or bus number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="search-results">
              {buses.filter(bus => bus.route.includes(searchQuery) || bus.busNumber.includes(searchQuery)).map(bus => (
                <div key={bus.busNumber}>
                  <h4>{`Bus Number: ${bus.busNumber}`}</h4>
                  <p>{`Route: ${bus.route}`}</p>
                  <p>{`Seats: ${bus.seats}`}</p>
                  <p>{`Cost: ${bus.cost}`}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
