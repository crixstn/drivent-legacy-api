import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ticketsService } from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getAllTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.getAllTypes();
    res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    if (error.name === 'UnauthorizedError') return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticket = await ticketsService.getTicket(userId);
    res.status(200).send(ticket);
  } catch (error) {
    if (error.name === 'UnauthorizedError') return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error.message);
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
    if (error.name === 'UnauthorizedError') return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error.message);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
