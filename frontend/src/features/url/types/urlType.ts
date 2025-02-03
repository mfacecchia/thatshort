import z from "zod";
import { urlSchema } from "../schemas/urlSchema";

type TUrl = z.infer<typeof urlSchema>;

export type { TUrl };
