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
    seatNumber: '',
  });
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [noBusesFound, setNoBusesFound] = useState(false);
  const [seatError, setSeatError] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNoBusesFound(false);
    try {
      const response = await axios.get('https://bus-booking-management-system1.onrender.com/buses', {
        params: {
          departure_from: destinationFrom,
          departure_to: destinationTo,
        },
      });
      const availableBusesData = response.data
        .filter((bus) => bus.departure_from === destinationFrom && bus.departure_to === destinationTo);

      if (availableBusesData.length === 0) {
        setNoBusesFound(true);
      } else {
        setBuses(availableBusesData);
      }
    } catch (error) {
      console.error('Error fetching buses:', error);
      setNoBusesFound(true);
    }
  };

  const handleBooking = async (busId) => {
    try {
      setSeatError(false);
      setAvailableSeats([]);

      const response = await axios.get('http://127.0.0.1:5555/seats', {
        params: { 
          bus_id: busId,
          status: 'available'
        },
      });

      const allSeats = response.data
        .filter((seat) => seat.bus_id === busId && seat.status === 'available');

      setAvailableSeats(allSeats);

      if (allSeats.length === 0) {
        setSeatError(true);
      }

      setSelectedBus(busId);
    } catch (error) {
      console.error('Error fetching seats:', error);
      setSeatError(true);
      setAvailableSeats([]);
    }
  };

  const handlePersonalDetailsChange = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value,
    });
  };

  const updateSeatStatus = async (seatId) => {
    try {
      await axios.patch('http://127.0.0.1:5555/seats', {
        seat_id: seatId, // Updated to use seat_id
        status: 'booked',
      });
    } catch (error) {
      console.error('Error updating seat status:', error);
    }
  };

  const handleBookTicket = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5555/bookings', {
        bus_id: selectedBus,
        seat_number: personalDetails.seatNumber,
        name: personalDetails.name,
        idNumber: personalDetails.idNumber,
        phoneNumber: personalDetails.phoneNumber,
        status: 'booked',
      });

      if (response.status === 201) {
        setBookingCompleted(true);
        setBookingConfirmation({
          ticketNumber: response.data.ticket_number,
          status: response.data.status,
        });

        // Find the seat ID from the availableSeats
        const seatToUpdate = availableSeats.find(seat => seat.seat_number === personalDetails.seatNumber);
        if (seatToUpdate) {
          // Update seat status after booking
          await updateSeatStatus(seatToUpdate.id);
        }

        // Update available seats list
        const updatedSeats = availableSeats.filter((seat) => seat.seat_number !== personalDetails.seatNumber);
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
                <p>Bus Capacity: {bus.seats_available}</p>
                <button onClick={() => handleBooking(bus.id)}>View Available Seats</button>
                {selectedBus === bus.id && (
                    <div className="seats-grid">
                        <p>Seats Available: {availableSeats.length}</p> 
                        <div className="seats-grid">
                    {seatError ? (
                        <p>No seats available for this bus.</p>
                    ) : (
                        availableSeats.map((seat) => (
                            <div
                            key={seat.id}
                            className={`seat-box ${personalDetails.seatNumber === seat.seat_number ? 'selected' : ''} ${seat.status === 'booked' ? 'booked' : ''}`}
                            onClick={() =>
                                seat.status === 'available' && setPersonalDetails({
                                    ...personalDetails,
                                    seatNumber: seat.seat_number,
                                })
                          }
                        >
                          {seat.seat_number}
                        </div>
                      ))
                    )}
                  </div>
                    </div>
                )}
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
          <button type="submit">Confirm Booking</button>
        </form>
      )}

      {bookingCompleted && bookingConfirmation && (
        <div className="booking-confirmation">
          <h3>Booking Completed!</h3>
          <p>Your seat has been successfully booked.</p>
          <p>Ticket Number: {bookingConfirmation.ticketNumber}</p>
          <p>Status: {bookingConfirmation.status}</p>
          <h3><b>TAKE NOTE OF TICKET NUMBER</b></h3>
        </div>
      )}
    </div>
  );
};

export default BookTickets;
