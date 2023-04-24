import { TicketStatus } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import userRepository from '@/repositories/user-repository';

type PostTicket = { ticketTypeId: number; userId: number };

async function getAllTypes() {
  return await ticketsRepository.getTypes();
}

async function getTicket(userId: number) {
  const user = await userRepository.findUser(userId);
  if (!user) throw notFoundError();

  const enrollment = await enrollmentRepository.findEnrollment(userId);
  if (!enrollment) throw notFoundError();
  const enrollmentId = enrollment.id;

  return await ticketsRepository.getTicket(enrollmentId);
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

export { ticketsService };
