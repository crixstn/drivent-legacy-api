import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

type PostTicket = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

async function getTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function getTicket(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: { enrollmentId },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
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

async function putStatus(ticketId: number) {
  return await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: 'PAID',
    },
  });
}

const ticketsRepository = {
  getTypes,
  getTicket,
  getUserTicket,
  postTicket,
  putStatus,
};

export default ticketsRepository;
