import { Request } from "express";
import rateLimit from "express-rate-limit";
import requestIp from "request-ip";
import TResponse from "../types/response.type";
import { setJsonResponse } from "./setJsonResponse";

type TRateLimitedResponseBody = {
    retryAfter?: string;
};

const tooManyRequestsHandler = async (req: Request, res: TResponse) => {
    const retryAfter = res.getHeader("retry-after");
    const responseBody: TRateLimitedResponseBody = {};
    if (retryAfter) {
        responseBody.retryAfter = String(retryAfter);
    }
    return setJsonResponse(
        res,
        429,
        `Too many requests. Please try again in ${
            retryAfter ? retryAfter + " seconds" : "a few minutes"
        }.`,
        responseBody
    );
};

const urlGenerationRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 3,
    standardHeaders: "draft-6",
    keyGenerator: (req: Request, res: TResponse) => {
        const ip = requestIp.getClientIp(req);
        if (!ip) return req.ip || "127.0.0.1";
        return ip;
    },
    // TODO: Move the message building in an external method
    message: async (req: Request, res: TResponse) => {
        const retryAfter = res.getHeader("retry-after");
        const responseBody: TRateLimitedResponseBody = {};
        if (retryAfter) {
            responseBody.retryAfter = String(retryAfter);
        }
        return setJsonResponse(
            res,
            429,
            `Too many requests. Please try again in ${
                retryAfter ? retryAfter + " seconds" : "a few minutes"
            }.`,
            responseBody
        );
    },
});

const urlRedirectRateLimit = rateLimit({
    windowMs: 2 * 60 * 1000,
    limit: 30,
    standardHeaders: "draft-6",
    keyGenerator: (req: Request, res: TResponse) => {
        const ip = requestIp.getClientIp(req);
        if (!ip) return req.ip || "127.0.0.1";
        return ip;
    },
    message: tooManyRequestsHandler,
});

export { urlGenerationRateLimit, urlRedirectRateLimit };
