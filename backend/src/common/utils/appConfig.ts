import cors from "cors";
import express, { Application, json } from "express";

import UrlController from "../../features/url/controller/UrlController";
import { handleError } from "../middlewares/handleError";
import TResponse from "../types/response.type";
import { setJsonResponse } from "./setJsonResponse";

// TODO: Make this a class with all relative methods
function startup(): Application {
    const app = express();
    app.set("x-powered-by", false);
    app.use(
        cors({
            origin: process.env.FRONTEND_ADDRESS,
        })
    );
    app.use(json());

    if (process.env.NODE_ENV === "development") buildDebugEndpoint(app);

    const urlController = new UrlController(app);
    urlController.buildEndpoints();

    app.use(handleError);
    buildNotFoundEndpoint(app);

    return app;
}

function buildDebugEndpoint(app: Application) {
    if (process.env.NODE_ENV === "production") return;
    app.get("/debug", (req, res: TResponse) => {
        setJsonResponse(res, 200, "Success", {});
        return;
    });
}

function buildNotFoundEndpoint(app: Application) {
    app.use((req, res: TResponse) => {
        setJsonResponse(
            res,
            404,
            `Route ${req.baseUrl + req.path} not found.`,
            {}
        );
    });
}

export default startup;
