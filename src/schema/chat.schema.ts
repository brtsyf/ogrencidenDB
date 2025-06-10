import { z } from "zod";

export const chatSchema = z.object({
  message: z.string().min(1, { message: "Message is required" }),
});

export const messageSchema = z.object({
  content: z.string().min(1, { message: "Content is required" }),
});

export const createConversationSchema = z.object({
  providerId: z.string().min(1, { message: "Provider ID is required" }),
  productId: z.string().min(1, { message: "Product ID is required" }),
});
