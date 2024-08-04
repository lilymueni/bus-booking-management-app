import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = () => {
    const [action, setAction] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
    };

    const renderContent = () => {
        if (formSubmitted) {
            if (action === 'print') {
                return <div className="result-message">You have selected to print a ticket.</div>;
            } else if (action === 'cancel') {
                return <div className="result-message">You have selected to cancel a booking.</div>;
            }
        }
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="action">Choose an action:</label>
                    <select
                        id="action"
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                    >
                        <option value="" disabled>Select an action</option>
                        <option value="print">Print Ticket</option>
                        <option value="cancel">Cancel Booking</option>
                    </select>
                </div>
                <button type="submit" className="btn-primary">Submit</button>
            </form>
        );
    };

    return (
        <div className="booking-container">
            <h2>Booking Actions</h2>
            {renderContent()}
        </div>
    );
};

export default BookingForm;
