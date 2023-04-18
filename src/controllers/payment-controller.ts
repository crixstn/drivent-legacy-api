import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const { ticketId } = req.query;
  if (!ticketId) return res.send(httpStatus.BAD_REQUEST);

  try {
    const payment = await paymentsService.getPayment(userId, Number(ticketId));
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  try {
    console.log('postPayment');
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
