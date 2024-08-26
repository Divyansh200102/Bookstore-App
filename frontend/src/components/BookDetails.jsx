// frontend/src/components/BookDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import ReviewForm from './ReviewForm';
import { toast } from 'react-toastify';


const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(data);
      } catch (error) {
        setError('Error fetching book details.'); // Set error state
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(book); // Assuming addToCart is a function that handles adding the book to the cart
    toast.success('Successfully added the book to the cart!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  

  const handleReviewAdded = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(data);
    } catch (error) {
      setError('Error updating book details.'); // Set error state
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!book) {
    return <div>No book found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img src={book.coverImage} alt={book.title} className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-xl text-gray-600 mt-2">{book.author}</p>
          <p className="text-lg font-semibold mt-4">${book.price.toFixed(2)}</p>
          <p className="mt-4">{book.description}</p>
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {book.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div>
            <p className="mb-2">Average Rating: {book.rating.toFixed(1)} / 5</p>
            {book.reviews.map((review) => (
              <div key={review._id} className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">{review.name}</p>
                  <p>{review.rating} / 5</p>
                </div>
                <p>{review.comment}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
        <ReviewForm bookId={book._id} onReviewAdded={handleReviewAdded} />
      </div>
    </div>
  );
};

export default BookDetails;
