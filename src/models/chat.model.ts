import prismaClient from "../config/prismaClient";
import { Message, SaveMessageFunction } from "../types/chatType";

export const createConversation = async (
  consumerId: string,
  providerId: string,
  productId: string
) => {
  try {
    const conversation = await prismaClient.conversation.create({
      data: {
        user1Id: consumerId,
        user2Id: providerId,
        listingId: productId,
      },
    });

    return conversation;
  } catch (error) {
    throw new Error("Failed to create conversation");
  }
};

export const getAllConversations = async (userId: string) => {
  try {
    const conversations = await prismaClient.conversation.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        messages: true,
      },
    });

    return conversations;
  } catch (error) {
    throw new Error("Failed to get all conversations");
  }
};

export const getConversation = async (id: string, userId: string) => {
  try {
    const conversation = await prismaClient.conversation.findUnique({
      where: {
        id,
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        messages: {
          include: {
            sender: true,
          },
        },
      },
    });

    return conversation;
  } catch (error) {
    throw new Error("Failed to get conversation");
  }
};

export const saveMessage: SaveMessageFunction = async ({
  conversationId,
  content,
  senderId,
}) => {
  try {
    const message = await prismaClient.message.create({
      data: {
        conversationId,
        content,
        senderId,
      },
    });
    return message;
  } catch (e: any) {
    throw new Error("Failed to save message");
  }
};
