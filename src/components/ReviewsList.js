import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReviewsList.css';

const ReviewsList = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('/api/reviews');
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="reviews-list">
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="review">
                        <h3>{review.name}</h3>
                        <p>{review.review}</p>
                        <p>Rating: {review.rating}</p>
                        <p><small>{new Date(review.date).toLocaleDateString()}</small></p>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
};

export default ReviewsList;
