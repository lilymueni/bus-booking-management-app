import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingForm.css';

const BookingForm = () => {
    const [ticket, setTicket] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');

    useEffect(() => {
        // Retrieve the ticket from local session or storage
        const storedTicket = sessionStorage.getItem('ticket');
        if (storedTicket) {
            setTicket(storedTicket);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        try {
            const response = await axios.delete('http://127.0.0.1:5555/bookings', {
                data: { ticket: ticket }  
            });

            if (response.status === 204) {
                setConfirmationMessage('Your booking has been successfully canceled.');
            } else {
                setConfirmationMessage('There was an error canceling your booking. Please try again.');
            }
        } catch (error) {
            console.error('Error canceling booking:', error);
            setConfirmationMessage('There was an error canceling your booking. Please try again.');
        }
    };

    return (
        <div className="booking-container">
            <h2>Cancel Booking</h2>
            {formSubmitted ? (
                <div className="result-message">{confirmationMessage}</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="ticket">Ticket Number:</label>
                        <input
                            type="text"
                            id="ticket"
                            value={ticket}
                            onChange={(e) => setTicket(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">Cancel Booking</button>
                </form>
            )}
        </div>
    );
};

export default BookingForm;
