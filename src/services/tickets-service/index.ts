import ticketsRepository from '@/repositories/tickets-repository';

async function getAllTypes() {
  return await ticketsRepository.getTypes();
}

const ticketsService = {
  getAllTypes,
};

export default ticketsService;
