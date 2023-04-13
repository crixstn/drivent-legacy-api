import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';

export async function getAllTypes(req: Request, res: Response) {
  try {
    const ticketTypes = await ticketsService.getAllTypes();
    res.send(ticketTypes);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
