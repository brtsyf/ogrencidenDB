import prismaClient from "../config/prismaClient";
import { Advert } from "../types/advertType";
import { ErrorType } from "../types/errorType";

export const createAdvert = async (advert: Advert, ownerEmail: string) => {
  try {
    const newAdvert = await prismaClient.adverts.create({
      data: {
        ...advert,
        ownerEmail,
      },
    });
    return newAdvert;
  } catch (error) {
    throw new Error(ErrorType.INTERNAL_SERVER_ERROR);
  }
};

export const deleteAdvert = async (id: string, ownerEmail: string) => {
  try {
    const deletedAdvert = await prismaClient.adverts.delete({
      where: { id, ownerEmail },
    });
    return deletedAdvert;
  } catch (error) {
    throw new Error(ErrorType.DB_ERROR);
  }
};

export const getAdvert = async (id: string, ownerEmail: string) => {
  try {
    const advert = await prismaClient.adverts.findUnique({
      where: { id, ownerEmail },
    });
    return advert;
  } catch (error) {
    throw new Error(ErrorType.DB_ERROR);
  }
};

export const updateAdvert = async (
  id: string,
  advert: Advert,
  ownerEmail: string
) => {
  try {
    const updatedAdvert = await prismaClient.adverts.update({
      where: { id, ownerEmail },
      data: {
        ...advert,
      },
    });
    return updatedAdvert;
  } catch (error) {
    throw new Error(ErrorType.DB_ERROR);
  }
};
