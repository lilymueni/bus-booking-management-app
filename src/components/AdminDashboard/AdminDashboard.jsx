import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [buses, setBuses] = useState([]);
  const [busDetails, setBusDetails] = useState({
    busNumber: '',
    seats: '',
    route: '',
    travelTime: '',
    cost: ''
  });
  const [busNumberToDelete, setBusNumberToDelete] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [scheduleDetails, setScheduleDetails] = useState({
    busNumber: '',
    route: '',
    departureTime: '',
    arrivalTime: ''
  });
  const [scheduleIdToDelete, setScheduleIdToDelete] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [driverDetails, setDriverDetails] = useState({
    driverName: '',
    driverLicense: ''
  });
  const [driverNameToDelete, setDriverNameToDelete] = useState('');
  const [bookings, setBookings] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    bookingId: '',
    busNumber: '',
    passengerName: '',
    seatsBooked: ''
  });
  const [bookingIdToDelete, setBookingIdToDelete] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const navigate = useNavigate();

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const handleAddBus = (e) => {
    e.preventDefault();
    const newBus = {
      busNumber: busDetails.busNumber,
      seats: busDetails.seats,
      route: busDetails.route,
      travelTime: busDetails.travelTime,
      cost: busDetails.cost
    };
    setBuses([...buses, newBus]);
    setBusDetails({
      busNumber: '',
      seats: '',
      route: '',
      travelTime: '',
      cost: ''
    });
  };

  const handleDeleteBus = (e) => {
    e.preventDefault();
    setBuses(buses.filter(bus => bus.busNumber !== busNumberToDelete));
    setBusNumberToDelete('');
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const newSchedule = {
      id: schedules.length + 1,
      busNumber: scheduleDetails.busNumber,
      route: scheduleDetails.route,
      departureTime: scheduleDetails.departureTime,
      arrivalTime: scheduleDetails.arrivalTime
    };
    setSchedules([...schedules, newSchedule]);
    setScheduleDetails({
      busNumber: '',
      route: '',
      departureTime: '',
      arrivalTime: ''
    });
  };

  const handleDeleteSchedule = (e) => {
    e.preventDefault();
    setSchedules(schedules.filter(schedule => schedule.id !== parseInt(scheduleIdToDelete)));
    setScheduleIdToDelete('');
  };

  const handleAddDriver = (e) => {
    e.preventDefault();
    const newDriver = {
      name: driverDetails.driverName,
      license: driverDetails.driverLicense
    };
    setDrivers([...drivers, newDriver]);
    setDriverDetails({ driverName: '', driverLicense: '' });
  };

  const handleDeleteDriver = (e) => {
    e.preventDefault();
    setDrivers(drivers.filter(driver => driver.name !== driverNameToDelete));
    setDriverNameToDelete('');
  };

  const handleAddBooking = (e) => {
    e.preventDefault();
    const newBooking = {
      id: bookings.length + 1,
      busNumber: bookingDetails.busNumber,
      passengerName: bookingDetails.passengerName,
      seatsBooked: bookingDetails.seatsBooked
    };
    setBookings([...bookings, newBooking]);
    setBookingDetails({
      bookingId: '',
      busNumber: '',
      passengerName: '',
      seatsBooked: ''
    });
  };

  const handleDeleteBooking = (e) => {
    e.preventDefault();
    setBookings(bookings.filter(booking => booking.id !== parseInt(bookingIdToDelete)));
    setBookingIdToDelete('');
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
              <li onClick={() => handleNavClick('deleteBus')}>Delete Bus</li>
              <li onClick={() => handleNavClick('addBus')}>Add Bus</li>
            </ul>
          </li>
          <li>
            Schedules
            <ul>
              <li onClick={() => handleNavClick('manageSchedules')}>Manage Schedules</li>
              <li onClick={() => handleNavClick('viewSchedules')}>View Schedules</li>
            </ul>
          </li>
          <li>
            Bookings
            <ul>
              <li onClick={() => handleNavClick('manageBookings')}>Manage Bookings</li>
              <li onClick={() => handleNavClick('bookingHistory')}>Booking History</li>
            </ul>
          </li>
          <li>
            Driver
            <ul>
              <li onClick={() => handleNavClick('manageUsers')}>Delete Driver</li>
              <li onClick={() => handleNavClick('addUser')}>Add Driver</li>
            </ul>
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      <div className="content">
        <h1>Dashboard Overview</h1>
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

        <h2>Recent Activities</h2>
        {/* Add recent activities content here */}

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

        {activeSection === 'deleteBus' && (
          <div className="form-section">
            <h2>Delete Bus</h2>
            <form onSubmit={handleDeleteBus}>
              <div className="form-group">
                <label htmlFor="bus-number">Bus Number:</label>
                <input
                  type="text"
                  id="bus-number"
                  name="busNumber"
                  value={busNumberToDelete}
                  onChange={(e) => setBusNumberToDelete(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Delete Bus</button>
            </form>
          </div>
        )}

        {activeSection === 'manageSchedules' && (
          <div className="form-section">
            <h2>Manage Schedules</h2>
            <form onSubmit={handleAddSchedule}>
              <div className="form-group">
                <label htmlFor="schedule-bus-number">Bus Number:</label>
                <input
                  type="text"
                  id="schedule-bus-number"
                  name="busNumber"
                  value={scheduleDetails.busNumber}
                  onChange={(e) => setScheduleDetails({ ...scheduleDetails, busNumber: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="schedule-route">Route:</label>
                <input
                  type="text"
                  id="schedule-route"
                  name="route"
                  value={scheduleDetails.route}
                  onChange={(e) => setScheduleDetails({ ...scheduleDetails, route: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="departure-time">Departure Time:</label>
                <input
                  type="datetime-local"
                  id="departure-time"
                  name="departureTime"
                  value={scheduleDetails.departureTime}
                  onChange={(e) => setScheduleDetails({ ...scheduleDetails, departureTime: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="arrival-time">Arrival Time:</label>
                <input
                  type="datetime-local"
                  id="arrival-time"
                  name="arrivalTime"
                  value={scheduleDetails.arrivalTime}
                  onChange={(e) => setScheduleDetails({ ...scheduleDetails, arrivalTime: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Add Schedule</button>
            </form>

            <form onSubmit={handleDeleteSchedule}>
              <div className="form-group">
                <label htmlFor="schedule-id">Schedule ID:</label>
                <input
                  type="number"
                  id="schedule-id"
                  name="scheduleId"
                  value={scheduleIdToDelete}
                  onChange={(e) => setScheduleIdToDelete(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Delete Schedule</button>
            </form>
          </div>
        )}

        {activeSection === 'viewSchedules' && (
          <div className="form-section">
            <h2>View Schedules</h2>
            <ul>
              {schedules.map(schedule => (
                <li key={schedule.id}>
                  <strong>Bus Number:</strong> {schedule.busNumber}, 
                  <strong>Route:</strong> {schedule.route}, 
                  <strong>Departure Time:</strong> {schedule.departureTime}, 
                  <strong>Arrival Time:</strong> {schedule.arrivalTime}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === 'manageBookings' && (
          <div className="form-section">
            <h2>Manage Bookings</h2>
            <form onSubmit={handleAddBooking}>
              <div className="form-group">
                <label htmlFor="booking-bus-number">Bus Number:</label>
                <input
                  type="text"
                  id="booking-bus-number"
                  name="busNumber"
                  value={bookingDetails.busNumber}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, busNumber: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="passenger-name">Passenger Name:</label>
                <input
                  type="text"
                  id="passenger-name"
                  name="passengerName"
                  value={bookingDetails.passengerName}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, passengerName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="seats-booked">Seats Booked:</label>
                <input
                  type="number"
                  id="seats-booked"
                  name="seatsBooked"
                  value={bookingDetails.seatsBooked}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, seatsBooked: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Add Booking</button>
            </form>

            <form onSubmit={handleDeleteBooking}>
              <div className="form-group">
                <label htmlFor="booking-id">Booking ID:</label>
                <input
                  type="number"
                  id="booking-id"
                  name="bookingId"
                  value={bookingIdToDelete}
                  onChange={(e) => setBookingIdToDelete(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Delete Booking</button>
            </form>

            {/* Search Input for Bookings */}
            <div className="form-group">
              <label htmlFor="booking-search">Search Bookings:</label>
              <input
                type="text"
                id="booking-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Passenger Name"
              />
            </div>

            <h2>Current Bookings</h2>
            <ul>
              {bookings
                .filter(booking => booking.passengerName.toLowerCase().includes(searchQuery.toLowerCase())) // Filtering bookings based on search query
                .map(booking => (
                  <li key={booking.id}>
                    <strong>Booking ID:</strong> {booking.id}, 
                    <strong>Bus Number:</strong> {booking.busNumber}, 
                    <strong>Passenger Name:</strong> {booking.passengerName}, 
                    <strong>Seats Booked:</strong> {booking.seatsBooked}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {activeSection === 'addUser' && (
          <div className="form-section">
            <h2>Add New Driver</h2>
            <form onSubmit={handleAddDriver}>
              <div className="form-group">
                <label htmlFor="driver-name">Driver Name:</label>
                <input
                  type="text"
                  id="driver-name"
                  name="driverName"
                  value={driverDetails.driverName}
                  onChange={(e) => setDriverDetails({ ...driverDetails, driverName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="driver-license">Driver License:</label>
                <input
                  type="text"
                  id="driver-license"
                  name="driverLicense"
                  value={driverDetails.driverLicense}
                  onChange={(e) => setDriverDetails({ ...driverDetails, driverLicense: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Add Driver</button>
            </form>
          </div>
        )}

        {activeSection === 'manageUsers' && (
          <div className="form-section">
            <h2>Delete Driver</h2>
            <form onSubmit={handleDeleteDriver}>
              <div className="form-group">
                <label htmlFor="driver-name">Driver Name:</label>
                <input
                  type="text"
                  id="driver-name"
                  name="driverName"
                  value={driverNameToDelete}
                  onChange={(e) => setDriverNameToDelete(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Delete Driver</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
