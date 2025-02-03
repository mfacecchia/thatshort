import { url } from "@prisma/client";
import PRISMA_CLIENT from "../../../common/db/prismaClient";

class UrlRepository {
    async find(id: url["id"]): Promise<url | null> {
        return await PRISMA_CLIENT.url.findUnique({
            where: {
                id: id,
            },
        });
    }

    async create(url: url): Promise<void> {
        await PRISMA_CLIENT.url.create({
            data: {
                id: url.id,
                redirect_to: url.redirect_to,
                created_at: new Date(),
            },
        });
    }
}

export default UrlRepository;
