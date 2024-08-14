import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminRegistration.css'; 

const AdminRegistration = () => {
  const [adminDetails, setAdminDetails] = useState({
    full_name: '',
    id_number: '',
    phone_number: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({ ...adminDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://bus-booking-management-system1.onrender.com/admins', adminDetails);
      console.log('Admin registered:', response.data);
      setResponseMessage('Admin registered successfully!');
      
      // Redirect to the dashboard after successful registration
      navigate('/admindashboard');
    } catch (error) {
      console.error('Error registering admin:', error);
      setResponseMessage('Failed to register admin.');
    }
  };

  return (
    <div className="admin-registration-container">
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="full-name">Full Name:</label>
          <input
            type="text"
            id="full-name"
            name="full_name"
            value={adminDetails.full_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="id-number">ID Number:</label>
          <input
            type="text"
            id="id-number"
            name="id_number"
            value={adminDetails.id_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone-number">Phone Number:</label>
          <input
            type="text"
            id="phone-number"
            name="phone_number"
            value={adminDetails.phone_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Register Admin</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default AdminRegistration;
