import { z } from "zod";

export const createAdvertSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export const updateAdvertSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    price: z.string().min(1, { message: "Price is required" }).optional(),
    description: z
      .string()
      .min(1, { message: "Description is required" })
      .optional(),
  })
  .refine(
    (data) => {
      return Object.values(data).some((value) => value !== undefined);
    },
    {
      message: "At least one field must be provided",
    }
  );
