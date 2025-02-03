import { url } from "@prisma/client";
import { Application, Request } from "express";
import { THandler } from "../../../common/types/request.type";
import TResponse from "../../../common/types/response.type";
import { BASE_V1_ENDPOINT } from "../../../common/utils/constants";
import { setJsonResponse } from "../../../common/utils/setJsonResponse";
import UrlService from "../service/UrlService";

class UrlController {
    private urlService: UrlService;
    private app: Application;

    constructor(app: Application) {
        this.urlService = new UrlService();
        this.app = app;
    }

    buildEndpoints(): void {
        this.app.get(BASE_V1_ENDPOINT + "/url/:urlId", this.findUrl());
        this.app.post(BASE_V1_ENDPOINT + "/url", this.createUrl());
    }

    findUrl(): THandler {
        return async (req: Request, res: TResponse) => {
            let urlId = req.params["urlId"];
            let url = await this.urlService.findUrl(urlId);
            setJsonResponse(res, 200, "Success", url);
            return;
        };
    }

    createUrl(): THandler {
        return async (req: Request, res: TResponse) => {
            let url: url = req.body;
            url.id = this.urlService.generateUrlId();
            await this.urlService.createUrl(url);
            // TODO: Return generated link (for example https://thatshort.it/abc123fg)
            setJsonResponse(res, 201, "Success", {});
            return;
        };
    }
}

export default UrlController;
