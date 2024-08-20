import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css'; 

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://bus-booking-management-system1.onrender.com/contact', {
                name,
                email,
                message
            });
            setResponseMessage('Thank you for your message!');
        } catch (error) {
            setResponseMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <div className='nav'>
                {/* Navigation content here if needed */}
            </div>

            <div className="contact-form" id='contactform'>
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button type="submit" className="submit-button">Send</button>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
            </div>
        </>
    );
};

export default ContactForm;
