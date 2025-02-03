import { NextFunction, Request } from "express";
import TResponse from "./response.type";

type THandler = (req: Request, res: TResponse, next: NextFunction) => void;

export { THandler };
