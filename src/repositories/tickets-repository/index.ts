import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

type PostTicket = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

async function getTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function getTicket(userId: number) {
  return await prisma.enrollment.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
      Ticket: {
        include: {
          TicketType: true,
        },
      },
    },
  });
}

async function getUserTicket(ticketId: number) {
  return await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: {
        select: {
          userId: true,
        },
      },
      TicketType: true,
    },
  });
}

async function postTicket({ status, enrollmentId, ticketTypeId }: PostTicket) {
  return await prisma.ticket.create({
    include: {
      TicketType: true,
    },
    data: {
      status,
      ticketTypeId,
      enrollmentId,
    },
  });
}

const ticketsRepository = {
  getTypes,
  getTicket,
  getUserTicket,
  postTicket,
};

export default ticketsRepository;
