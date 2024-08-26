import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ bookId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null); // Add error state
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // Reset error before submission
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      await axios.post(
        `http://localhost:5000/api/books/${bookId}/reviews`,
        { rating, comment },
        config
      );

      onReviewAdded();
      setRating(5);
      setComment('');
    } catch (error) {
      setError('Failed to submit the review. Please try again.');
      console.error('Error adding review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Add a Review</h3>
      
      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
      
      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-700 font-medium mb-1">Rating:</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor="comment" className="block text-gray-700 font-medium mb-1">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        ></textarea>
      </div>
      
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-lg text-white ${isSubmitting ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} transition-colors`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
