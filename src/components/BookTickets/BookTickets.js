import React, { useState } from 'react';
import './Booktickets.css';

const BookTickets = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [returnTicket, setReturnTicket] = useState(false);
  const [availableBuses, setAvailableBuses] = useState([]);
  const [bookingStep, setBookingStep] = useState('search');
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    idNumber: '',
    phoneNumber: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate fetching available buses
    const buses = [
      { id: 1, name: 'Bus A', price: 500, availableSeats: 20 },
      { id: 2, name: 'Bus B', price: 700, availableSeats: 15 },
    ];
    setAvailableBuses(buses);
    setBookingStep('selectBus');
  };

  const handleBook = (busId) => {
    setBookingStep('enterDetails');
  };

  const handleConfirmBooking = () => {
    // Process booking confirmation
    alert('Booking Confirmed!');
  };

  return (
    <div className="book-tickets">
      {bookingStep === 'search' && (
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label>From:</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>To:</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={returnTicket}
                onChange={(e) => setReturnTicket(e.target.checked)}
              />
              Return Ticket
            </label>
          </div>
          <button type="submit" className="search-button">Search</button>
        </form>
      )}

      {bookingStep === 'selectBus' && (
        <div className="available-buses">
          <h2>Available Buses</h2>
          <ul>
            {availableBuses.map((bus) => (
              <li key={bus.id}>
                {bus.name} - ${bus.price} - {bus.availableSeats} seats available
                <button onClick={() => handleBook(bus.id)}>Book</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {bookingStep === 'enterDetails' && (
        <form onSubmit={handleConfirmBooking} className="details-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={personalDetails.name}
              onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>ID Number:</label>
            <input
              type="text"
              value={personalDetails.idNumber}
              onChange={(e) => setPersonalDetails({ ...personalDetails, idNumber: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              value={personalDetails.phoneNumber}
              onChange={(e) => setPersonalDetails({ ...personalDetails, phoneNumber: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="confirm-button">Confirm Booking</button>
        </form>
      )}
    </div>
  );
};

export default BookTickets