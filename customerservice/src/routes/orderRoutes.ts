import { Router } from 'express';
import { createOrder, updateOrder } from '../controllers/orderController';

const router = Router();

router.post('/', createOrder);
router.post('/update/:orderId', updateOrder);



export default router;