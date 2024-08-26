// frontend/src/components/Dashboard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList';
import LogoutButton from './LogoutButton';
import ShoppingBagIcon from './ShoppingBagIcon';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectedGenre, setSelectedGenre] = useState('');
  
  // Define your genres here
  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Thriller', 'Gothic', 'Adventure'];

  return (
    <div className="min-h-screen bg-white border-[#aa5939]" style={{ borderWidth: '40px' }}>
     
      <ShoppingBagIcon />
      
      {/* Genre selection boxes */}
      <div className="bg-[#452315] py-4 px-6 flex flex-col items-center min-h-[300px]">
  {/* Shop text */}
  <p className="text-white text-6xl font-bold font-serif mt-[120px]">SHOP</p>

  {/* Genre buttons container */}
  <div className="flex space-x-4 overflow-x-auto mt-5">
    <button
      onClick={() => setSelectedGenre('')}
      className={`px-3 py-1 rounded-full text-sm ${
        selectedGenre === '' ? 'bg-[#aa5939] text-white' : 'bg-[#aa5939] text-white'
      }`}
    >
      All Genres
    </button>
    {genres.map((genre) => (
      <button
        key={genre}
        onClick={() => setSelectedGenre(genre)}
        className={`px-3 py-1 rounded-xl text-sm ${
          selectedGenre === genre ? 'bg-[#aa5939] text-white' : 'bg-[#aa5939] text-white'
        }`}
      >
        {genre}
      </button>
    ))}
  </div>
</div>

<LogoutButton/>

<div className="py-14">
  <main className="w-full">
    <div className="w-full mx-auto sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-full pr-4">
          <BookList selectedGenre={selectedGenre} />
        </div>
      </div>
    </div>
  </main>
</div>

    </div>
  );
};

export default Dashboard;