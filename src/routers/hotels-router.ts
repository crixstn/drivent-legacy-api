import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllHotels } from '@/controllers';

const hotelRouter = Router();

hotelRouter.all('/*', authenticateToken).get('/', getAllHotels);
//.get('/:hotelId');

export { hotelRouter };
