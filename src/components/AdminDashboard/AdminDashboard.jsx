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


  // User management states
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [contacts, setContacts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBuses();
    fetchUsers();
    fetchBookings();
    fetchReviews();
    fetchContacts();
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

  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://bus-booking-management-system1.onrender.com/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get('https://bus-booking-management-system1.onrender.com/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
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


  const handleUpdateBus = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('https://bus-booking-management-system1.onrender.com/buses/${busDetails.id}', busDetails);
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
      await axios.delete('https://bus-booking-management-system1.onrender.com/buses/${busId}');
      toast.success('Bus deleted successfully!');
      fetchBookings();
      fetchBuses();
      fetchContacts();
      fetchUsers();
      fetchReviews();
    } catch (error) {
      console.error('Error deleting bus:', error.response ? error.response.data : error.message);
      toast.error('Error deleting bus:', error.response ? error.response.data.error : error.message);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://bus-booking-management-system1.onrender.com/contact');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    axios.delete('https://bus-booking-management-system1.onrender.com/logout');
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('userSession');
    document.cookie = 'authToken=; Max-Age=0; path=/;';
    navigate('/login');
  };

  // const handleDeleteBooking = async (bookingId, seatId) => {
  //   try {
  //     await axios.delete(`https://bus-booking-management-system1.onrender.com/bookings/${bookingId}`);
  //     toast.success('Booking deleted successfully!');

  //     // Update seat status after booking deletion
  //     await updateSeatStatus(seatId);

  //     // Refresh data after deleting the booking
  //     fetchBookings();
  //     fetchBuses();
  //     fetchContacts();
  //     fetchUsers();
  //     fetchReviews();
  //   } catch (error) {
  //     console.error('Error deleting booking:', error);
  //     toast.error('Error deleting booking');
  //   }
  // };

  // const updateSeatStatus = async (seatId) => {
  //   try {
  //     await axios.patch(`https://bus-booking-management-system1.onrender.com/seats}`, {
  //       seat_id: seatId,
  //       status: 'available'
  //     });
  //     toast.success('Seat status updated successfully!');
  //   } catch (error) {
  //     console.error('Error updating seat status:', error);
  //     toast.error('Error updating seat status');
  //   }
  // };

  return (
    <div>
      <div className="navbar">
        <img src={images} alt="TransitWise Logo" className="navbar-logo" />
        <h2>TransitWise</h2>
        <ul>
          <li onClick={() => handleNavClick('dashboard')}>Dashboard</li>
          <li onClick={() => handleNavClick('manageBuses')}>Manage Buses</li>
          <li onClick={() => handleNavClick('manageUsers')}>Manage Users</li>
          <li onClick={() => handleNavClick('manageBookings')}>Manage Bookings</li>
          <li onClick={() => handleNavClick('manageReviews')}>Manage Reviews</li>
          <li onClick={() => handleNavClick('manageContacts')}>Manage Contacts</li>
          <li onClick={() => handleLogout()}>Logout</li>
        </ul>
      </div>

      <div className="content">
        {/* Dashboard Welcome Section */}
        {activeSection === 'dashboard' && (
          <div className="welcome-section">
            <h2>Welcome to the Admin Dashboard</h2>
            <p>Manage your buses, users, bookings, reviews, and contact messages from here.</p>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAcz4tqRNcTDlWl_ylrQ2Ph7osdYPpPX0TEhADKe-CwUPpVXkJXONAooa34ixUY-Q_fyc&usqp=CAU"
              alt="Admin Welcome"
              className="welcome-image"
            />

          </div>
        )}

        {/* Bus Management Section */}
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
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Booking Management Section */}
        {activeSection === 'manageBookings' && (
          <div className="booking-management-section">
            <h2>Manage Bookings</h2>
            <table className="bus-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Bus</th>
                  <th>User</th>
                  <th>ID Number</th>
                  <th>Phone Number</th>
                  <th>Ticket Number</th>
                  <th>Seats</th>
                  <th>Date</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.bus_id}</td>
                    <td>{booking.name}</td>
                    <td>{booking.idNumber}</td>
                    <td>{booking.phoneNumber}</td>
                    <td>{booking.ticket}</td>
                    <td>{booking.seat_number}</td>
                    <td>{booking.created_at.date}</td>
                    {/* <td>
                      <button 
                        className='delete-button'
                        onClick={() => handleDeleteBooking(booking.id, booking.seat_id)}
                        >Delete</button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Review Management Section */}
        {activeSection === 'manageReviews' && (
          <div className="review-management-section">
            <h2>Manage Reviews</h2>
            <table className="bus-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>User</th>
                  <th>Rating</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(review => (
                  <tr key={review.id}>
                    <td>{review.id}</td>
                    <td>{review.email}</td>
                    <td>{review.name}</td>
                    <td>{review.rating}</td>
                    <td>{review.review}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Contact Us Management Section */}
        {activeSection === 'manageContacts' && (
          <div className="contact-management-section">
            <h2>Manage Contact Us Messages</h2>
            <table className="bus-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(contact => (
                  <tr key={contact.id}>
                    <td>{contact.id}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
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
