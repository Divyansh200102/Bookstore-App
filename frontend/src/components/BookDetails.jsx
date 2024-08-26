import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import ReviewForm from './ReviewForm';
import { toast } from 'react-toastify';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(data);
      } catch (error) {
        setError('Error fetching book details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(book);
    toast.success('Added to cart', {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleReviewAdded = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(data);
    } catch (error) {
      setError('Error updating book details.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-600 text-xl">{error}</div>;
  }

  if (!book) {
    return <div className="text-center py-10 text-xl">No book found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <div className="lg:w-1/3 mb-8 lg:mb-0">
          <div className="relative group">
            <img src={book.coverImage} alt={book.title} className="w-full rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <p className="text-white text-lg font-semibold">View Larger</p>
            </div>
          </div>
        </div>
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">{book.title}</h1>
          <p className="text-2xl text-purple-600 mb-4">{book.author}</p>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.round(book.rating) ? "text-yellow-400" : "text-gray-300"} />
              ))}
            </div>
            <p className="text-gray-600">({book.reviews.length} reviews)</p>
          </div>
          <p className="text-3xl font-bold mb-6 text-indigo-600">${book.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-8 leading-relaxed">{book.description}</p>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-full hover:from-purple-600 hover:to-indigo-700 transition duration-300 flex items-center justify-center space-x-2 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <FaShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Customer Reviews</h2>
        {book.reviews.length === 0 ? (
          <p className="text-gray-600 text-lg italic">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-8">
            {book.reviews.map((review) => (
              <div key={review._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                  <p className="font-semibold text-lg text-gray-800">{review.reviewer}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12">
        <ReviewForm bookId={book._id} onReviewAdded={handleReviewAdded} />
      </div>
    </div>
  );
};

export default BookDetails;