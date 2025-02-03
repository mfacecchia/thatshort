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
        let createdUrl = await PRISMA_CLIENT.url.create({
            data: {
                id: url.id,
                redirect_to: url.redirect_to,
                created_at: new Date(),
            },
        });
        url.created_at = createdUrl.created_at;
    }
}

export default UrlRepository;
