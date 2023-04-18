import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPayment, postPayment } from '@/controllers';

const paymentRouter = Router();

paymentRouter.all('/*', authenticateToken).get('/', getPayment).post('/process', postPayment);

export { paymentRouter };
