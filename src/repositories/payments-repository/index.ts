import { prisma } from '@/config';
import { PaymentProcess } from '@/protocols';

async function getPayment(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function postPayment(paymentProcess: PaymentProcess, value: number) {
  return await prisma.payment.create({
    data: {
      ticketId: paymentProcess.ticketId,
      cardIssuer: paymentProcess.cardData.issuer,
      cardLastDigits: paymentProcess.cardData.number.toString().substring(11, 160),
      value: value,
    },
  });
}

const paymentsRepository = {
  getPayment,
  postPayment,
};

export default paymentsRepository;
