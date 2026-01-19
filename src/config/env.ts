import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.string().default("development"),

  KEYCLOAK_BASE_URL: z.string().url(),
  KEYCLOAK_REALM: z.string(),

  KEYCLOAK_ADMIN_REALM: z.string(),
  KEYCLOAK_ADMIN_CLIENT_ID: z.string(),
  KEYCLOAK_ADMIN_USERNAME: z.string(),
  KEYCLOAK_ADMIN_PASSWORD: z.string(),

  KEYCLOAK_PUBLIC_CLIENT_ID: z.string(),
});

export const env = envSchema.parse(process.env);
