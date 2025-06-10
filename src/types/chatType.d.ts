import { z } from "zod";
import { messageSchema } from "../schema/chat.schema";

export type Message = z.infer<typeof messageSchema> & {
  senderId: string;
  conversationId: string;
};
export type SaveMessageFunction = (message: Message) => Promise<Message>;
