import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllTypes, getTickets, postTicket } from '@/controllers';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken).get('/types', getAllTypes).get('/', getTickets).post('/', postTicket);

export { ticketRouter };
