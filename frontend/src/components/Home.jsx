// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from './LogoutButton';
import ShoppingBagIcon from './ShoppingBagIcon';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        const response = await axios.get('http://localhost:5000/api/books', {
          params: { search: searchTerm.trim() },
        });
        const books = response.data;

        // If a book is found, navigate to its details page
        if (books.length > 0) {
          const book = books[0]; // Assume the first match is the one we want
          navigate(`/api/book/${book._id}`);
        } else {
          // Handle case where no books are found
          alert('No books found.');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        alert('An error occurred while searching.');
      }
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#26130b]  border-t-[#aa5939] border-l-[#aa5939] border-r-[#aa5939]" style={{ borderWidth: '40px' }}>
      <LogoutButton/>
      <ShoppingBagIcon/>
    <div className="flex flex-col justify-center items-center h-screen mt-[-150px]">
      <p className='absolute text-white font-normal mt-[-180px]'>Essential books that every reader should include in their collection  </p>
      <p className='text-white font-bold font-serif text-5xl mt-5'>WORKS BY TOP AUTHORS</p>
      <form onSubmit={handleSearch} className="flex items-center mt-7">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2  w-64 bg-[#dcd0cc] placeholder-[#aa5939] placeholder:font-semibold"
        />
        <button
          type="submit"
          className="bg-brown-500 text-white p-2  border border-[#aa5939] bg-[#aa5939]"
        >
          Search
        </button>
      </form>
    </div>
    </div>
  );
};

export default Home;