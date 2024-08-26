import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookList = ({ selectedGenre }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books');
        setBooks(res.data);
        setFilteredBooks(res.data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const results = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenre === '' || book.genre === selectedGenre)
    );
    setFilteredBooks(results);
  }, [searchTerm, selectedGenre, books]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <Link to={`/book/${book._id}`}>
              <div className="relative">
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="w-full h-[450px] object-cover" 
                />
              </div>
            </Link>
            <div className="p-4">
              <p className="text-sm text-gray-500">{book.genre}</p>
              <Link to={`/book/${book._id}`}>
                <h3 className="text-2xl font-semibold mt-2">{book.title}</h3>
              </Link>
              <p className="mt-2 text-lg font-bold">${book.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
