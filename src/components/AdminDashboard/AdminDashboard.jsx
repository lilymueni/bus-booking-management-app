import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

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
  const [busNumberToDelete, setBusNumberToDelete] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [scheduleDetails, setScheduleDetails] = useState({
    number_plate: '',
    departure_from: '',
    departure_to: '',
    departure_time: '',
    arrival_time: ''
  });
  const [scheduleIdToDelete, setScheduleIdToDelete] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [driverDetails, setDriverDetails] = useState({
    driver_id: '',
    driver_name: '',
    driver_license: ''
  });
  const [driverNameToDelete, setDriverNameToDelete] = useState('');
  const [bookings, setBookings] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    booking_id: '',
    number_plate: '',
    passenger_name: '',
    seats_booked: ''
  });
  const [bookingIdToDelete, setBookingIdToDelete] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchBuses();
    fetchSchedules();
    fetchDrivers();
    fetchBookings();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get('https://bus-booking-management-system1.onrender.com/buses');
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('https://bus-booking-management-system1.onrender.com/schedules');
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('https://bus-booking-management-system1.onrender.com/drivers');
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://bus-booking-management-system1.onrender.com/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const handleAddBus = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://bus-booking-management-system1.onrender.com/buses', busDetails);
      fetchBuses();
      setMessage('Bus added successfully!');
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
      setMessage('Failed to add bus.');
    }
  };

  const handleDeleteBus = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`https://bus-booking-management-system1.onrender.com/buses/${busNumberToDelete}`);
      fetchBuses();
      setMessage('Bus deleted successfully!');
      setBusNumberToDelete('');
    } catch (error) {
      console.error('Error deleting bus:', error);
      setMessage('Failed to delete bus.');
    }
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://bus-booking-management-system1.onrender.com/schedules', scheduleDetails);
      fetchSchedules();
      setMessage('Schedule added successfully!');
      setScheduleDetails({
        number_plate: '',
        departure_from: '',
        departure_to: '',
        departure_time: '',
        arrival_time: ''
      });
    } catch (error) {
      console.error('Error adding schedule:', error);
      setMessage('Failed to add schedule.');
    }
  };

  const handleDeleteSchedule = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`https://bus-booking-management-system1.onrender.com/schedules/${scheduleIdToDelete}`);
      fetchSchedules();
      setMessage('Schedule deleted successfully!');
      setScheduleIdToDelete('');
    } catch (error) {
      console.error('Error deleting schedule:', error);
      setMessage('Failed to delete schedule.');
    }
  };

  const handleAddDriver = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://bus-booking-management-system1.onrender.com/drivers', driverDetails);
      fetchDrivers();
      setMessage('Driver added successfully!');
      setDriverDetails({
        driver_id: '',
        driver_name: '',
        driver_license: ''
      });
    } catch (error) {
      console.error('Error adding driver:', error);
      setMessage('Failed to add driver.');
    }
  };

  const handleDeleteDriver = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`https://bus-booking-management-system1.onrender.com/drivers/${driverNameToDelete}`);
      fetchDrivers();
      setMessage('Driver deleted successfully!');
      setDriverNameToDelete('');
    } catch (error) {
      console.error('Error deleting driver:', error);
      setMessage('Failed to delete driver.');
    }
  };

  const handleAddBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://bus-booking-management-system1.onrender.com/bookings', bookingDetails);
      fetchBookings();
      setMessage('Booking added successfully!');
      setBookingDetails({
        booking_id: '',
        number_plate: '',
        passenger_name: '',
        seats_booked: ''
      });
    } catch (error) {
      console.error('Error adding booking:', error);
      setMessage('Failed to add booking.');
    }
  };

  const handleDeleteBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`https://bus-booking-management-system1.onrender.com/bookings/${bookingIdToDelete}`);
      fetchBookings();
      setMessage('Booking deleted successfully!');
      setBookingIdToDelete('');
    } catch (error) {
      console.error('Error deleting booking:', error);
      setMessage('Failed to delete booking.');
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
        <h2>Admin Dashboard</h2>
        <ul>
          <li>
            Buses
            <ul>
              <li onClick={() => handleNavClick('manageBuses')}>Manage Buses</li>
            </ul>
          </li>
          <li>
            Schedules
            <ul>
              <li onClick={() => handleNavClick('manageSchedules')}>Manage Schedules</li>
            </ul>
          </li>
          <li>
            Drivers
            <ul>
              <li onClick={() => handleNavClick('manageDrivers')}>Manage Drivers</li>
            </ul>
          </li>
          <li>
            Bookings
            <ul>
              <li onClick={() => handleNavClick('manageBookings')}>Manage Bookings</li>
            </ul>
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      <div className="content">
        <h1>Dashboard Overview</h1>
        {message && <div className="message">{message}</div>}
        <div className="stats">
          <div>
            <h2>Total Buses</h2>
            <p>{buses.length}</p>
          </div>
          <div>
            <h2>Total Schedules</h2>
            <p>{schedules.length}</p>
          </div>
          <div>
            <h2>Total Bookings</h2>
            <p>{bookings.length}</p>
          </div>
          <div>
            <h2>Total Drivers</h2>
            <p>{drivers.length}</p>
          </div>
        </div>

        {activeSection === 'manageBuses' && (
          <div className="form-section">
            <h2>Manage Buses</h2>
            <form onSubmit={handleAddBus}>
              <div className="form-group">
                <label htmlFor="number-plate">Number Plate:</label>
                <input
                  type="text"
                  id="number-plate"
                  value={busDetails.number_plate}
                  onChange={(e) => setBusDetails({ ...busDetails, number_plate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="driver-id">Driver ID:</label>
                <input
                  type="text"
                  id="driver-id"
                  value={busDetails.driver_id}
                  onChange={(e) => setBusDetails({ ...busDetails, driver_id: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="number-of-seats">Number of Seats:</label>
                <input
                  type="number"
                  id="number-of-seats"
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
                  value={busDetails.departure_time}
                  onChange={(e) => setBusDetails({ ...busDetails, departure_time: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="arrival-time">Arrival Time:</label>
                <input
                  type="depaturetime-local"
                  id="arrival-time"
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
                  value={busDetails.price_per_seat}
                  onChange={(e) => setBusDetails({ ...busDetails, price_per_seat: e.target.value })}
                  required
                />
              </div>
              <button type="submit">Add Bus</button>
            </form>

            <form onSubmit={handleDeleteBus}>
              <h3>Delete Bus</h3>
              <div className="form-group">
                <label htmlFor="bus-number-delete">Bus Number:</label>
                <input
                  type="text"
                  id="bus-number-delete"
                  value={busNumberToDelete}
                  onChange={(e) => setBusNumberToDelete(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Delete Bus</button>
            </form>
          </div>
        )}

        {activeSection === 'manageSchedules' && (
          <div className="form-section">
            <h2>Manage Schedules</h2>
            <form onSubmit={handleAddSchedule}>
              <div className="form-group">
                <label htmlFor="number-plate">Number Plate:</label>
                <input
                  type="text"
                  id="number-plate"
                  value={scheduleDetails.number_plate}
                  onChange={(e) => setScheduleDetails({ ...scheduleDetails, number_plate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="departure-from">Departure From:</label>
                <input
                  type="text"
                  id="departure-from"
                  value={scheduleDetails.departure_from}
                  onChange={(e) => setScheduleDetails({ ...scheduleDetails, departure_from: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="departure-to">Departure To:</label>
                <input
                  type="text"
                  id="departure-to"
                  value={scheduleDetails.departure_to}
                  onChange={(e) => setScheduleDetails({ ...scheduleDetails, departure_to: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="departure-time">Departure Time:</label>
                <input
                  type="time"
                  id="departure-time"
                  value={scheduleDetails.departure_time}
                  onChange={(e) => setScheduleDetails({ ...scheduleDetails, departure_time: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="arrival-time">Arrival Time:</label>
                <input
                  type="time"
                  id="arrival-time"
                  value={scheduleDetails.arrival_time}
                  onChange={(e) => setScheduleDetails({ ...scheduleDetails, arrival_time: e.target.value })}
                  required
                />
              </div>
              <button type="submit">Add Schedule</button>
            </form>

            <form onSubmit={handleDeleteSchedule}>
              <h3>Delete Schedule</h3>
              <div className="form-group">
                <label htmlFor="schedule-id-delete">Schedule ID:</label>
                <input
                  type="text"
                  id="schedule-id-delete"
                  value={scheduleIdToDelete}
                  onChange={(e) => setScheduleIdToDelete(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Delete Schedule</button>
            </form>
          </div>
        )}

        {activeSection === 'manageDrivers' && (
          <div className="form-section">
            <h2>Manage Drivers</h2>
            <form onSubmit={handleAddDriver}>
              <div className="form-group">
                <label htmlFor="driver-id">Driver ID:</label>
                <input
                  type="text"
                  id="driver-id"
                  value={driverDetails.driver_id}
                  onChange={(e) => setDriverDetails({ ...driverDetails, driver_id: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="driver-name">Driver Name:</label>
                <input
                  type="text"
                  id="driver-name"
                  value={driverDetails.driver_name}
                  onChange={(e) => setDriverDetails({ ...driverDetails, driver_name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="driver-license">Driver License:</label>
                <input
                  type="text"
                  id="driver-license"
                  value={driverDetails.driver_license}
                  onChange={(e) => setDriverDetails({ ...driverDetails, driver_license: e.target.value })}
                  required
                />
              </div>
              <button type="submit">Add Driver</button>
            </form>

            <form onSubmit={handleDeleteDriver}>
              <h3>Delete Driver</h3>
              <div className="form-group">
                <label htmlFor="driver-name-delete">Driver Name:</label>
                <input
                  type="text"
                  id="driver-name-delete"
                  value={driverNameToDelete}
                  onChange={(e) => setDriverNameToDelete(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Delete Driver</button>
            </form>
          </div>
        )}

        {activeSection === 'manageBookings' && (
          <div className="form-section">
            <h2>Manage Bookings</h2>
            <form onSubmit={handleAddBooking}>
              <div className="form-group">
                <label htmlFor="booking-id">Booking ID:</label>
                <input
                  type="text"
                  id="booking-id"
                  value={bookingDetails.booking_id}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, booking_id: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="number-plate">Number Plate:</label>
                <input
                  type="text"
                  id="number-plate"
                  value={bookingDetails.number_plate}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, number_plate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="passenger-name">Passenger Name:</label>
                <input
                  type="text"
                  id="passenger-name"
                  value={bookingDetails.passenger_name}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, passenger_name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="seats-booked">Seats Booked:</label>
                <input
                  type="number"
                  id="seats-booked"
                  value={bookingDetails.seats_booked}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, seats_booked: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="total-amount">Total Amount:</label>
                <input
                  type="number"
                  id="total-amount"
                  value={bookingDetails.total_amount}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, total_amount: e.target.value })}
                  required
                />
              </div>
              <button type="submit">Add Booking</button>
            </form>

            <form onSubmit={handleDeleteBooking}>
              <h3>Delete Booking</h3>
              <div className="form-group">
                <label htmlFor="booking-id-delete">Booking ID:</label>
                <input
                  type="text"
                  id="booking-id-delete"
                  value={bookingIdToDelete}
                  onChange={(e) => setBookingIdToDelete(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Delete Booking</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

