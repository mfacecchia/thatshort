import { Request } from "express";
import TResponse from "./response.type";

type THandler = (req: Request, res: TResponse) => void;

export { THandler };
