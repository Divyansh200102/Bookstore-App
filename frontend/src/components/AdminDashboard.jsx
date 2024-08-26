// frontend/src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    coverImage: '',
    description: '',
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const token = localStorage.getItem('token'); // Retrieve token
    try {
      const res = await axios.get('http://localhost:5000/api/books', {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in header
        },
      });
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('Current token:', token); // Log token to verify it's present
  
    try {
      if (editingBook) {
        console.log('Updating book:', formData); // Log form data
        await axios.put(`http://localhost:5000/api/books/${editingBook._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        console.log('Adding book:', formData); // Log form data
        await axios.post('http://localhost:5000/api/books', formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      fetchBooks();
      setEditingBook(null);
      setFormData({
        title: '',
        author: '',
        genre: '',
        price: '',
        coverImage: '',
        description: '',
      });
    } catch (err) {
      console.error('Error saving book:', err);
    }
  };
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      price: book.price,
      coverImage: book.coverImage,
      description: book.description,
    });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Retrieve token
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in header
        },
      });
      fetchBooks();
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-4xl font-extrabold font-serif text-gray-900 mb-3">Admin Dashboard</h2>
          
          <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold font-serif mb-4 text-gray-800">{editingBook ? 'Edit Book' : 'Add New Book'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Author"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                placeholder="Genre"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleInputChange}
                placeholder="Cover Image URL"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                required
              ></textarea>
            </div>
            <button type="submit" className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              {editingBook ? 'Update Book' : 'Add Book'}
            </button>
          </form>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.map((book) => (
                  <tr key={book._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${book.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={() => handleEdit(book)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={() => handleDelete(book._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
