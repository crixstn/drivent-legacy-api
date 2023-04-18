import { TicketStatus } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

type PostTicket = { ticketTypeId: number; userId: number };

async function getAllTypes() {
  return await ticketsRepository.getTypes();
}

async function getTicket(userId: number) {
  const ticket = await ticketsRepository.getTicket(userId);
  if (!ticket) throw notFoundError();
  return ticket;
}

async function postTicket({ userId, ticketTypeId }: PostTicket) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const status: TicketStatus = 'RESERVED';
  const { id: enrollmentId } = enrollment;

  return await ticketsRepository.postTicket({
    ticketTypeId,
    enrollmentId,
    status,
  });
}

const ticketsService = {
  getAllTypes,
  getTicket,
  postTicket,
};

export default ticketsService;
