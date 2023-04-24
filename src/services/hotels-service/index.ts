import httpStatus from 'http-status';
import { notFoundError } from '@/errors';
import userRepository from '@/repositories/user-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getAllHotels(userId: number) {
  const user = await userRepository.findUser(userId);
  if (!user) throw notFoundError();

  const ticket = await ticketsRepository.getTicket(user.id);
  if (!ticket) throw notFoundError();
  if (ticket.status != 'PAID') throw httpStatus.PAYMENT_REQUIRED;
  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw httpStatus.PAYMENT_REQUIRED;

  return await hotelsRepository.getAllHotels();
}

const hotelsService = {
  getAllHotels,
};

export { hotelsService };
