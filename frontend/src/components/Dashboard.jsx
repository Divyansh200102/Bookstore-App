// frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList';
import LogoutButton from './LogoutButton';
import ShoppingBagIcon from './ShoppingBagIcon';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectedGenre, setSelectedGenre] = useState('');
  const [scrollY, setScrollY] = useState(0);

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Thriller', 'Gothic', 'Adventure'];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#23120b] to-[#aa5939]">

      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-[#aa5939]"
        style={{ scaleX: scrollY / (document.documentElement.scrollHeight - window.innerHeight) }}
      />



      <div className="py-20 px-6 flex flex-col items-center relative overflow-hidden">
        <motion.h1
          className="text-white text-7xl font-bold font-serif mb-10"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          EXPLORE BOOKS
        </motion.h1>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-10"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <button
            onClick={() => setSelectedGenre('')}
            className={`px-6 py-2 rounded-full text-lg transition-all duration-300 ${selectedGenre === '' ? 'bg-white text-[#23120b]' : 'bg-[#aa5939] text-white hover:bg-white hover:text-[#23120b]'
              }`}
          >
            All Genres
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-6 py-2 rounded-full text-lg transition-all duration-300 ${selectedGenre === genre ? 'bg-white text-[#23120b]' : 'bg-[#aa5939] text-white hover:bg-white hover:text-[#23120b]'
                }`}
            >
              {genre}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-[#aa5939] rounded-full opacity-20"
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#aa5939] rounded-full opacity-20"
          animate={{ scale: [1, 1.3, 1], rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <LogoutButton />

      <motion.div
        className="py-14 bg-white rounded-t-3xl shadow-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <main className="w-full max-w-7xl mx-auto px-6">
          <BookList selectedGenre={selectedGenre} />
        </main>
      </motion.div>
      <ShoppingBagIcon />
    </div>
  );
};

export default Dashboard;