import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { hotelsService } from '@/services/hotels-service';

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelsService.getAllHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error === httpStatus.PAYMENT_REQUIRED) return res.status(httpStatus.PAYMENT_REQUIRED).send(error.message);
    if (error.name === 'UnauthorizedError') return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error.message);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotelId: number = parseInt(req.params.hotelId);
  try {
    const hotel = await hotelsService.getHotelById(userId, hotelId);
    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
