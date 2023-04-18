import { prisma } from '@/config';

async function getPayment(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function postPayment() {
  console.log('post payment');
}

const paymentsRepository = {
  getPayment,
  postPayment,
};

export default paymentsRepository;
