import { Router } from 'express';
import { createCustomer, loginCustomer } from '../controllers/customerController';

const router = Router();

router.post('/', createCustomer);
router.post('/login', loginCustomer);



export default router;