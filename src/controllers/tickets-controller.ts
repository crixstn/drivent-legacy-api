import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getAllTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.getAllTypes();
    res.send(ticketTypes);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticket = await ticketsService.getTicket(userId);
    res.send(ticket);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketTypeId: number = req.body.ticketTypeId;

  try {
    const ticket = await ticketsService.postTicket({ userId, ticketTypeId });
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
