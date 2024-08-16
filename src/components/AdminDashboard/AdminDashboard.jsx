import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminDashboard.css';
import images from './images.jpeg';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [buses, setBuses] = useState([]);
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
  const [isEditing, setIsEditing] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  // User management states
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({
    email: '',
    username: ''
  });
  const [isUserEditing, setIsUserEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBuses();
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get('https://bus-booking-management-system1.onrender.com/buses');
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://bus-booking-management-system1.onrender.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const handleEditBus = (busId) => {
    const bus = buses.find(b => b.id === busId);
    if (bus) {
      const { created_at, updated_at, ...busData } = bus;
      setBusDetails(busData);
      setIsEditing(true);
      setActiveSection('addBus');
    }
  };

  const handleAddBus = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://bus-booking-management-system1.onrender.com/buses', busDetails);
      toast.success('Bus added successfully!');
      fetchBuses();
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
    } catch (error) {
      console.error('Error adding bus:', error);
      toast.error('Error adding bus');
    }
  };

  const handleUpdateBus = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://bus-booking-management-system1.onrender.com/buses/${busDetails.id}`, busDetails);
      toast.success('Bus updated successfully!');
      fetchBuses();
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
      setActiveSection('dashboard');
    } catch (error) {
      console.error('Error updating bus:', error);
      toast.error('Error updating bus');
    }
  };

  
  const handleDeleteBus = async (busId) => {
    try {
      await axios.delete(`https://bus-booking-management-system1.onrender.com/buses/${busId}`);
      toast.success('Bus deleted successfully!');
      fetchBuses();
    } catch (error) {
      console.error('Error deleting bus:', error.response ? error.response.data : error.message);
      toast.error(`Error deleting bus: ${error.response ? error.response.data.error : error.message}`);
    }
  };
  
  
  const handleAddBusButtonClick = () => {
    setIsEditing(false);
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
    setActiveSection('addBus');
  };

  // User Management Handlers
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://bus-booking-management-system1.onrender.com/users/', userDetails);
      toast.success('User added successfully!');
      fetchUsers();
      setUserDetails({
        email: '',
        username: ''
      });
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Error adding user');
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://bus-booking-management-system1.onrender.com/users/${userDetails.id_number}`, userDetails);
      toast.success('User updated successfully!');
      fetchUsers();
      setUserDetails({
        email: '',
        username: ''
      });
      setIsUserEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://bus-booking-management-system1.onrender.com/users/${userId}`);
      toast.success('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
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
          <img src={images} alt="TransitWise Logo" className="navbar-logo" />
          <h2>TransitWise</h2>
        <ul>
          <li onClick={() => handleNavClick('dashboard')}>Dashboard</li>
          <li onClick={() => handleNavClick('manageBuses')}>Manage Buses</li>
          <li onClick={() => handleNavClick('manageUsers')}>Manage Users</li>
          <li onClick={() => handleLogout()}>Logout</li>
        </ul>
      </div>

      <div className="content">
        {/* Dashboard Welcome Section */}
        {activeSection === 'dashboard' && (
          <div className="welcome-section">
            <h2>Welcome to the Admin Dashboard</h2>
            <p>Manage your buses, users, and more from here.</p>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAcz4tqRNcTDlWl_ylrQ2Ph7osdYPpPX0TEhADKe-CwUPpVXkJXONAooa34ixUY-Q_fyc&usqp=CAU" alt="Admin Welcome" className="welcome-image" />
          </div>
        )}

        {/* Bus Form Section */}
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

        {/* Bus Management Table Section */}
        {activeSection === 'manageBuses' && (
          <div className="bus-management-section">
            <h2>Manage Buses</h2>
            <table className="bus-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Number Plate</th>
                  <th>Seats</th>
                  <th>Departure</th>
                  <th>Arrival</th>
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
                    <td>{bus.departure_from} at {bus.departure_time}</td>
                    <td>{bus.arrival_to} at {bus.arrival_time}</td>
                    <td>{bus.price_per_seat}</td>
                    <td>
                      <button onClick={() => handleEditBus(bus.id)}>Edit</button>
                      <button onClick={() => handleDeleteBus(bus.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleAddBusButtonClick} className="add-bus-button">Add New Bus</button>
          </div>
        )}

        {/* User Management Section */}
        {activeSection === 'manageUsers' && (
          <div className="user-management-section">
            <h2>Manage Users</h2>
            

            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>

                  <th>Email</th>
                  <th>Username</th>
                  
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id_number}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
