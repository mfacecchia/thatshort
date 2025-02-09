import { Response } from "express";

type TDefaultData = Record<string, unknown>;

type TDefaultResponseBody<TData = TDefaultData> = {
    status: number;
    message: string;
    data: TData;
};

type TResponse<ResponseBody = TDefaultResponseBody> = Response<ResponseBody>;

export default TResponse;
export { TDefaultResponseBody };
