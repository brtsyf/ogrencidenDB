import prismaClient from "../config/prismaClient";
import { Advert } from "../types/advertType";
import { ErrorType } from "../types/errorType";

export const createAdvert = async (advert: Advert, ownerID: string) => {
  try {
    const newAdvert = await prismaClient.adverts.create({
      data: {
        ...advert,
        ownerID,
      },
    });
    return newAdvert;
  } catch (error) {
    throw new Error(ErrorType.INTERNAL_SERVER_ERROR);
  }
};

export const deleteAdvert = async (id: string, ownerID: string) => {
  try {
    const deletedAdvert = await prismaClient.adverts.delete({
      where: { id, ownerID },
    });
    return deletedAdvert;
  } catch (error) {
    throw new Error(ErrorType.DB_ERROR);
  }
};

export const getAdvert = async (id: string) => {
  try {
    const advert = await prismaClient.adverts.findUnique({
      where: { id },
    });
    return advert;
  } catch (error) {
    throw new Error(ErrorType.DB_ERROR);
  }
};

export const updateAdvert = async (
  id: string,
  advert: Advert,
  ownerID: string
) => {
  try {
    const updatedAdvert = await prismaClient.adverts.update({
      where: { id, ownerID },
      data: {
        ...advert,
      },
    });
    return updatedAdvert;
  } catch (error) {
    throw new Error(ErrorType.DB_ERROR);
  }
};
