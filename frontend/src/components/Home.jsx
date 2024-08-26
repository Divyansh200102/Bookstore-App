import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LogoutButton from './LogoutButton';
import ShoppingBagIcon from './ShoppingBagIcon';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Array of book-related background images
    const images = [
      'url(https://qph.cf2.quoracdn.net/main-qimg-9b4267c07c73a0c6099650d9fd3e9933-lq)',
      'url(https://d1csarkz8obe9u.cloudfront.net/posterpreviews/a-beautiful-unique-book-cover-art-design-template-0d50ce167d52e19534fe3af0307ff273_screen.jpg?ts=1637000940)',
    ];
    setBackgroundImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      navigate('/dashboard');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/books', {
        params: { search: searchTerm.trim() },
      });
      const books = response.data;
    
      // Check if the books array is not empty
      const matchingBook = books.find(book => book.title.toLowerCase() === searchTerm.trim().toLowerCase());
    
      if (matchingBook) {
        // If a matching book is found, navigate to its detail page
        navigate(`/api/book/${matchingBook._id}`);
      } else {
        // If no matching book is found, show an error message
        toast.error(`No books found with the name "${searchTerm}"`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('An error occurred while searching.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: backgroundImage }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 text-center px-4 py-8">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4 shadow-lg"
        >
          EXPLORE LITERARY WORLDS
        </motion.h1>
        <motion.p 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto shadow-lg"
        >
          Discover essential books that every reader should include in their collection
        </motion.p>
        <motion.form 
          onSubmit={handleSearch}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex items-center w-full max-w-md mx-auto"
        >
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 rounded-l-full bg-white bg-opacity-80 text-gray-900 placeholder-gray-500 border-2 border-gray-300 focus:outline-none focus:border-yellow-500 transition duration-300"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-gray-900 p-4 rounded-r-full hover:bg-yellow-400 transition duration-300 focus:outline-none"
          >
            <FaSearch className="text-xl" />
          </button>
        </motion.form>
      </div>
      <div className="absolute top-4 right-4 flex space-x-4 z-10">
        <ShoppingBagIcon />
        <LogoutButton />
      </div>
    </motion.div>
  );
};

export default Home;
