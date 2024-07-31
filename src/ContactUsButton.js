import React, { useState } from 'react';
import ContactForm from './ContactForm';

const ContactUsButton = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleButtonClick = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div>
            <button className="contact-us-button" onClick={handleButtonClick}>
                Contact Us
            </button>
            {isFormVisible && <ContactForm />}
        </div>
    );
};

export default ContactUsButton;
