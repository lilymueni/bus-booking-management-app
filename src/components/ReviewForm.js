import React, { useState } from 'react';
import axios from 'axios';
import './ReviewForm.css';

const ReviewForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://bus-booking-management-system1.onrender.com/reviews', {
                name,
                email,
                review,
                rating
            });
            setResponseMessage('Thank you for your review!');
        } catch (error) {
            setResponseMessage('An error occurred. Please try again later.');
        }
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    return (
        <div className="review-form">
            <h2>Submit a Review</h2>
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
                <label htmlFor="review">Review:</label>
                <textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
                <div className="rating">
                    <label>Rating:</label>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={rating >= star ? 'selected' : ''}
                                onClick={() => handleRatingChange(star)}
                            >
                                &#9733;
                            </span>
                        ))}
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default ReviewForm;