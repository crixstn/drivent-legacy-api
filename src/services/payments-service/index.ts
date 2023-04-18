import { notFoundError } from '@/errors';
import paymentsRepository from '@/repositories/payments-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getPayment(userId: number, ticketId: number) {
  const ticket = await ticketsRepository.getUserTicket(userId);
  if (!ticket) throw notFoundError();

  return await paymentsRepository.getPayment(ticketId);
}

async function postPayment() {
  console.log('post payment');
}

const paymentsService = {
  getPayment,
  postPayment,
};

export { paymentsService };
