// backend/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, createBook, updateBook, deleteBook, createBookReview } = require('../controllers/bookController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllBooks); // Get all books or search books by title
router.get('/:id', getBookById); // Get a specific book by ID

// Admin routes
router.post('/', protect, admin, createBook);
router.put('/:id', protect, admin, updateBook);
router.delete('/:id', protect, admin, deleteBook);
router.post('/:id/reviews', protect, createBookReview);

module.exports = router;
