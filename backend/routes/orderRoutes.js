// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, updateOrderToPaid } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

module.exports = router;