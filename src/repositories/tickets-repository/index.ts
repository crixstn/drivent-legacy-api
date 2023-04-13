import { TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getTypes() {
  return prisma.ticketType.findMany();
}

const ticketsRepository = {
  getTypes,
};

export default ticketsRepository;
