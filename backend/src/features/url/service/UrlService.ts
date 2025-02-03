import { url } from "@prisma/client";
import crypto from "crypto";
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
                // TODO: Throw custom error
                throw new Error("Url not found.");
            }
            return url;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async createUrl(url: url): Promise<void> {
        try {
            await this.urlRepository.create(url);
        } catch (err) {
            console.log(err);
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
