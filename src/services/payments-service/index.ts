import { notFoundError, unauthorizedError } from '@/errors';
import { PaymentProcess } from '@/protocols';
import paymentsRepository from '@/repositories/payments-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getPayment(userId: number, ticketId: number) {
  const ticket = await ticketsRepository.getUserTicket(ticketId);
  if (!ticket) throw notFoundError();
  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  return await paymentsRepository.getPayment(ticketId);
}

async function postPayment(userId: number, paymentProcess: PaymentProcess) {
  const ticket = await ticketsRepository.getUserTicket(paymentProcess.ticketId);
  if (!ticket) throw notFoundError();
  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  await ticketsRepository.putStatus(ticket.id);
  const value = ticket.TicketType.price;
  return await paymentsRepository.postPayment(paymentProcess, value);
}

const paymentsService = {
  getPayment,
  postPayment,
};

export { paymentsService };
