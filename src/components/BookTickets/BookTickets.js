import React, { useState } from 'react';
import axios from 'axios';
import './BookTickets.css';

const BookTickets = () => {
  const [destinationFrom, setDestinationFrom] = useState('');
  const [destinationTo, setDestinationTo] = useState('');
  const [date, setDate] = useState('');
  const [returnTicket, setReturnTicket] = useState(false);
  const [returnDate, setReturnDate] = useState('');
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    idNumber: '',
    phoneNumber: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/buses', {
        params: {
          date,
          from: destinationFrom,
          to: destinationTo,
        },
      });
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  const handleBooking = async (busId) => {
    try {
      const response = await axios.get(`/api/buses/${busId}/seats`);
      setAvailableSeats(response.data);
      setSelectedBus(busId);
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  };

  const handlePersonalDetailsChange = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookTicket = async (e) => {
    e.preventDefault();
    // Add booking logic here
  };

  return (
    <div className="book-tickets-container">
      <form onSubmit={handleSubmit} className="book-tickets-form">
        <h2>Book Your Ticket</h2>
        <label>
          From:
          <input
            type="text"
            value={destinationFrom}
            onChange={(e) => setDestinationFrom(e.target.value)}
            required
          />
        </label>
        <label>
          To:
          <input
            type="text"
            value={destinationTo}
            onChange={(e) => setDestinationTo(e.target.value)}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          Return Ticket:
          <input
            type="checkbox"
            checked={returnTicket}
            onChange={(e) => setReturnTicket(e.target.checked)}
          />
        </label>
        {returnTicket && (
          <label>
            Return Date:
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required={returnTicket}
            />
          </label>
        )}
        <button type="submit">Search</button>
      </form>

      {buses.length > 0 && (
        <div className="buses-list">
          <h3>Available Buses</h3>
          <ul>
            {buses.map((bus) => (
              <li key={bus.id}>
                <p>Bus Name: {bus.name}</p>
                <p>Price: {bus.price}</p>
                <button onClick={() => handleBooking(bus.id)}>Book</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedBus && (
        <form onSubmit={handleBookTicket} className="book-ticket-form">
          <h3>Personal Details</h3>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={personalDetails.name}
              onChange={handlePersonalDetailsChange}
              required
            />
          </label>
          <label>
            ID Number:
            <input
              type="text"
              name="idNumber"
              value={personalDetails.idNumber}
              onChange={handlePersonalDetailsChange}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={personalDetails.phoneNumber}
              onChange={handlePersonalDetailsChange}
              required
            />
          </label>

          {availableSeats.length > 0 && (
            <div className="available-seats">
              <h3>Available Seats</h3>
              <ul>
                {availableSeats.map((seat) => (
                  <li key={seat.id}>{seat.number}</li>
                ))}
              </ul>
            </div>
          )}
          <button type="submit">Confirm Booking</button>
        </form>
      )}
    </div>
  );
};

export default BookTickets;
