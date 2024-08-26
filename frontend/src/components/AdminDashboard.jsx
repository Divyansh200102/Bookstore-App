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
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <h3 className="text-xl font-semibold mb-2">{editingBook ? 'Edit Book' : 'Add New Book'}</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Author"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            placeholder="Genre"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleInputChange}
            placeholder="Cover Image URL"
            className="border p-2 rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border p-2 rounded"
            required
          ></textarea>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          {editingBook ? 'Update Book' : 'Add Book'}
        </button>
      </form>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Author</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td className="py-2 px-4 border-b">{book.title}</td>
              <td className="py-2 px-4 border-b">{book.author}</td>
              <td className="py-2 px-4 border-b">${book.price.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded"
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
  );
};

export default AdminDashboard;
