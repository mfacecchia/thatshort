import z from "zod";

const requiredString = z.string().trim().min(1, "This field is required");

const urlString = requiredString.url();

export { requiredString, urlString };
