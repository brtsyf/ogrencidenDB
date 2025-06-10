import { Router, Request, Response } from "express";
import { schemaValidator } from "../middlewares/schemaValidator.middleware";
import { createConversationSchema, messageSchema } from "../schema/chat.schema";
import {
  createConversation,
  getAllConversations,
  getConversation,
  saveMessage,
} from "../models/chat.model";

const router = Router();

router.post(
  "/create-conversation",
  schemaValidator(createConversationSchema),
  async (req: Request, res: Response) => {
    const { providerId, productId } = req.body;

    const conversation = await createConversation(
      (req as any).user.id,
      providerId,
      productId
    );

    res.status(201).json({ conversation });
  }
);

router.get("/", async (req: Request, res: Response) => {
  console.log((req as any).user);
  const conversations = await getAllConversations((req as any).user.id);
  res.status(200).json({ conversations });
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const conversation = await getConversation(id, (req as any).user.id);

  res.status(200).json({ conversation });
});

router.post(
  "/:id",
  schemaValidator(messageSchema),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;

    const message = await saveMessage({
      conversationId: id,
      content,
      senderId: (req as any).user.id,
    });

    res.status(201).json({ message });
  }
);

export default router;
