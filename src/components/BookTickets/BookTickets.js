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
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [noBusesFound, setNoBusesFound] = useState(false); // New state for error handling

  // Handle search for buses based on from, to, and date
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNoBusesFound(false); // Reset the state on new search
    try {
      const response = await axios.get('https://bus-booking-management-system1.onrender.com/buses', {
        params: {
          from: destinationFrom,
          to: destinationTo,
        },
      });
      if (response.data.length === 0) {
        setNoBusesFound(true);
      } else {
        setBuses(response.data);
      }
    } catch (error) {
      console.error('Error fetching buses:', error);
      setNoBusesFound(true); // Show error message on fetch failure
    }
  };

  // Handle fetching available seats for the selected bus
  const handleBooking = async (busId) => {
    try {
      const response = await axios.get(`https://bus-booking-management-system1.onrender.com/buses/${busId}`);
      setAvailableSeats(response.data);
      setSelectedBus(busId);
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  };

  // Handle change in personal details form
  const handlePersonalDetailsChange = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle booking the ticket
  const handleBookTicket = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://bus-booking-management-system1.onrender.com/bookings', {
        bus_id: selectedBus,
        seat_number: personalDetails.seatNumber, // Pass the selected seat number
        personal_details: personalDetails,
      });

      if (response.status === 200) {
        setBookingCompleted(true);
        // Update available seats after booking
        const updatedSeats = availableSeats.filter(seat => seat.id !== response.data.booked_seat_id);
        setAvailableSeats(updatedSeats);
      }
    } catch (error) {
      console.error('Error booking ticket:', error);
    }
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

      {noBusesFound && (
        <div className="no-buses-found">
          <h3>No Buses Available</h3>
          <p>No buses were found matching your search criteria. Please try a different search.</p>
        </div>
      )}

      {buses.length > 0 && !noBusesFound && (
        <div className="buses-list">
          <h3>Available Buses</h3>
          <ul>
            {buses.map((bus) => (
              <li key={bus.id}>
                <p>Bus Name: {bus.number_plate}</p>
                <p>Price: {bus.price_per_seat}</p>
                <p>Seats Available: {bus.seats_available}</p>
                <button onClick={() => handleBooking(bus.id)}>View Seats</button>
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
                  <li key={seat.id}>
                    <input
                      type="radio"
                      id={`seat-${seat.id}`}
                      name="seatNumber"
                      value={seat.number}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          seatNumber: e.target.value,
                        })
                      }
                      required
                    />
                    <label htmlFor={`seat-${seat.id}`}>{seat.number}</label>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button type="submit">Confirm Booking</button>
        </form>
      )}

      {bookingCompleted && (
        <div className="booking-confirmation">
          <h3>Booking Completed!</h3>
          <p>Your seat has been successfully booked.</p>
        </div>
      )}
    </div>
  );
};

export default BookTickets;
