import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DriverRegistration.css';

const DriverRegistration = () => {
  const [driverDetails, setDriverDetails] = useState({
    full_name: '',
    driving_license: '',
    id_number: '',
    phone_number: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverDetails({ ...driverDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://bus-booking-management-system1.onrender.com/drivers', driverDetails);
      console.log('Driver registered:', response.data);
      setResponseMessage('Driver registered successfully!');
      
      // Redirect to the dashboard after successful registration
      navigate('/driverdashboard');
    } catch (error) {
      console.error('Error registering driver:', error);
      setResponseMessage('Failed to register driver.');
    }
  };

  return (
    <div className="driver-registration-container">
      <h2>Driver Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="full-name">Full Name:</label>
          <input
            type="text"
            id="full-name"
            name="full_name"
            value={driverDetails.full_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="driving-license">Driving License:</label>
          <input
            type="text"
            id="driving-license"
            name="driving_license"
            value={driverDetails.driving_license}
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
            value={driverDetails.id_number}
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
            value={driverDetails.phone_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Register Driver</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default DriverRegistration;
