import {
  createAdvert,
  deleteAdvert,
  getAdvert,
  updateAdvert,
} from "../models/advert.model";
import { Request, Response } from "express";
import { ErrorType } from "../types/errorType";

export const createAdvertController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, price, description } = req.body;
    const newAdvert = await createAdvert(
      { name, price, description },
      (req as any).user.id
    );
    return res.status(201).json(newAdvert);
  } catch (error) {
    return res.status(500).json({ message: ErrorType.INTERNAL_SERVER_ERROR });
  }
};

export const deleteAdvertController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const deletedAdvert = await deleteAdvert(id, (req as any).user.id);
    return res.status(200).json(deletedAdvert);
  } catch (error) {
    return res.status(500).json({ message: ErrorType.INTERNAL_SERVER_ERROR });
  }
};

export const getAdvertController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const advert = await getAdvert(id);
    return res.status(200).json(advert);
  } catch (error) {
    return res.status(500).json({ message: ErrorType.INTERNAL_SERVER_ERROR });
  }
};

export const updateAdvertController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const updatedAdvert = await updateAdvert(
      id,
      {
        name,
        price,
        description,
      },
      (req as any).user.id
    );
    return res.status(200).json(updatedAdvert);
  } catch (error) {
    return res.status(500).json({ message: ErrorType.INTERNAL_SERVER_ERROR });
  }
};
