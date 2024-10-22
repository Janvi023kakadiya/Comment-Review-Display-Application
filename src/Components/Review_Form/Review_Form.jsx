import React, { useState } from "react";

const Review_Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submit, setSubmit] = useState([]);
    const [errors, setErrors] = useState({}); 

    const handleStarsClick = (index) => {
        setRating(index + 1);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const validateForm = () => {
        let validationErrors = {};
        if (name.length === 0) validationErrors.name = "Name is required.";
        if (email.length === 0) {
            validationErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.email = "Email is invalid.";
        }
        if (comment.length === 0) validationErrors.comment = "Feedback is required.";
        if (rating === 0) validationErrors.rating = "Rating is required.";

        return validationErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newSubmit = {
            name,
            email,
            comment,
            rating,
          
        };
        setSubmit([...submit, newSubmit]);


        setName('');
        setEmail('');
        setComment('');
        setRating(0);
        setErrors({}); 
    };

    return (
        <div className="socialmedia-post">
            <div className="form-container">
                <div className="form-card">
                    <h2 className="form-title">Share Your Feedback</h2>

                    <div className="logo-container">
                        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="instagram logo" className="social-logo" />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-input"
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={handleNameChange}
                            />
                            {errors.name && <p className="error">{errors.name}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-input"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="comment" className="form-label">Your Feedback</label>
                            <textarea
                                className="form-input"
                                id="comment"
                                placeholder="Leave a comment"
                                rows="4"
                                value={comment}
                                onChange={handleCommentChange}
                            ></textarea>
                            {errors.comment && <p className="error">{errors.comment}</p>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Your Rating</label>
                            <div className="rating">
                                {[...Array(5)].map((_, index) => (
                                    <span
                                        key={index}
                                        className={`star ${index < rating ? 'filled' : ''}`}
                                        onClick={() => handleStarsClick(index)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            {errors.rating && <p className="error">{errors.rating}</p>}
                        </div>

                        <button type="submit" className="submit-button">
                            Submit Feedback
                        </button>
                    </form>

                    <div className="submitted-feedback">
                        <h3 className="feedback-title">Recent Feedback</h3>
                        {submit.length > 0 ? (
                            submit.map((feedback, index) => (
                                <div key={index} className="feedback-item">
                                    <p><strong>Name:</strong> {feedback.name}</p>
                                    <p><strong>Email:</strong> {feedback.email}</p>
                                    <p><strong>Comment:</strong> {feedback.comment}</p>
                                    <p><strong>Rating:</strong> {feedback.rating} Stars</p>
                                    <p><small><em>Date Submitted:</em> {feedback.date}</small></p>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p className="no-feedback">No feedback yet. Be the first to share!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review_Form;
