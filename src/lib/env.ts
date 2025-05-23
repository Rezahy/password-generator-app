import { z } from "zod";
const envSchema = z.object({
	VITE_PASSWORD_SECRET_KEY: z.string(),
});

export const env = envSchema.parse(import.meta.env);
