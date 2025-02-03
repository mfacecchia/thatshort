import { urlString } from "@/common/validators/defaultValidators";
import z from "zod";

const urlSchema = z.object({
    redirect_to: urlString,
});

export { urlSchema };
