import { url } from "@prisma/client";
import {
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import crypto from "crypto";
import DatabaseConnectionError from "../../../common/errors/DatabaseConnectionError";
import NotFoundError from "../../../common/errors/NotFoundError";
import UrlCollisionError from "../errors/UrlCollisionError";
import UrlRepository from "../repository/UrlRepository";

class UrlService {
    private urlRepository: UrlRepository;

    constructor() {
        this.urlRepository = new UrlRepository();
    }

    async findUrl(id: url["id"]): Promise<url> {
        try {
            let url = await this.urlRepository.find(id);
            if (!url) {
                throw new NotFoundError("Url not found.");
            }
            return url;
        } catch (err) {
            if (err instanceof PrismaClientInitializationError) {
                throw new DatabaseConnectionError(
                    "Cannot establish connection to database.",
                    err
                );
            }
            throw err;
        }
    }

    async createUrl(url: url): Promise<void> {
        try {
            await this.urlRepository.create(url);
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === "P2002") {
                    throw new UrlCollisionError(
                        "Collision detected. A new key needs to be generated.",
                        err
                    );
                }
            }
            throw err;
        }
    }

    async increaseUsages(id: url["id"]): Promise<void> {
        try {
            await this.urlRepository.increaseUsages(id);
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === "P2025") {
                    throw new NotFoundError("Url not found.", err);
                }
            }
            throw err;
        }
    }

    generateUrlId(): string {
        return crypto.randomBytes(4).toString("hex");
    }

    generateShortenedUrl(url: url): string {
        return `${process.env.FRONTEND_ADDRESS}/${url.id}`;
    }
}

export default UrlService;
