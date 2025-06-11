import { createAdvertSchema } from "../schema/advert.schema";
import { z } from "zod";

export type Advert = z.infer<typeof createAdvertSchema>;
