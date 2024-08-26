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
    <form onSubmit={handleSubmit} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg mt-8 border border-blue-100">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Add Your Review</h3>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <div className="mb-6">
        <label htmlFor="rating" className="block text-gray-700 font-semibold mb-2">Rating:</label>
        <div className="relative">
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="comment" className="block text-gray-700 font-semibold mb-2">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows="4"
          required
          placeholder="Share your thoughts about the book..."
        ></textarea>
      </div>
      
      <button
        type="submit"
        className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isSubmitting 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800'
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        ) : (
          'Submit Review'
        )}
      </button>
    </form>
  );
};

export default ReviewForm;
