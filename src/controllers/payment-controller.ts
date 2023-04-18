import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { paymentsService } from '@/services/payments-service';
import { PaymentProcess } from '@/protocols';

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const ticketId = Number(req.query.ticketId);
  if (!ticketId || typeof ticketId !== 'number') return res.send(httpStatus.BAD_REQUEST);

  try {
    const payment = await paymentsService.getPayment(userId, ticketId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error.message);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const paymentProcess: PaymentProcess = req.body;

  try {
    const payment = await paymentsService.postPayment(userId, paymentProcess);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error.message);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
