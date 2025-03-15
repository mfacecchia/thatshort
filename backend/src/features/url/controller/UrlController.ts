import { url } from "@prisma/client";
import { Application, NextFunction, Request } from "express";
import { THandler } from "../../../common/types/request.type";
import TResponse from "../../../common/types/response.type";
import { BASE_V1_ENDPOINT } from "../../../common/utils/constants";
import {
    urlGenerationRateLimit,
    urlRedirectRateLimit,
} from "../../../common/utils/rateLimits";
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
        this.app.get(
            BASE_V1_ENDPOINT + "/url/:urlId",
            urlRedirectRateLimit,
            this.findUrl()
        );
        this.app.post(
            BASE_V1_ENDPOINT + "/url",
            urlGenerationRateLimit,
            this.createUrl()
        );
    }

    findUrl(): THandler {
        return async (req: Request, res: TResponse, next: NextFunction) => {
            try {
                let urlId = req.params["urlId"];
                let url = await this.urlService.findUrl(urlId);
                this.urlService.increaseUsages(url.id);
                setJsonResponse(res, 200, "Success", url);
                return;
            } catch (err) {
                next(err);
                return;
            }
        };
    }

    createUrl(): THandler {
        return async (req: Request, res: TResponse, next: NextFunction) => {
            try {
                let url: url = req.body;
                url.id = this.urlService.generateUrlId();
                await this.urlService.createUrl(url);
                let shortenedUrl = this.urlService.generateShortenedUrl(url);
                setJsonResponse(res, 201, "Success", {
                    shortenedUrl: shortenedUrl,
                });
                return;
            } catch (err) {
                next(err);
                return;
            }
        };
    }
}

export default UrlController;
