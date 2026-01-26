import express from 'express';
import { 
    createOrder, 
    getOrdersByUser, 
    getOrderById,
    getSellerOrders,
    updateOrderStatus 
} from '../Controller/orderController.js';
import { authenticate } from '../Middleware/auth.js';
import { validateOrder } from '../Middleware/validation.js';

const router = express.Router();

router.post('/', authenticate, validateOrder, createOrder);
router.get('/', authenticate, getOrdersByUser);
router.get('/seller', authenticate, getSellerOrders);
router.get('/:id', authenticate, getOrderById);
router.patch('/:id/status', authenticate, updateOrderStatus);

export default router;