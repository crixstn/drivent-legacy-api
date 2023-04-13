import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllTypes } from '@/controllers';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken).get('/types', getAllTypes);

export { ticketRouter };
