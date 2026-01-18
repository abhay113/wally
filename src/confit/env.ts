import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "production"]),

  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_KEY: z.string(),

  REDIS_URL: z.string(),

  STELLAR_NETWORK: z.enum(["testnet", "mainnet"]),
  STELLAR_HORIZON_URL: z.string().url(),

  KEYCLOAK_URL: z.string().url(),
  KEYCLOAK_REALM: z.string(),
  KEYCLOAK_CLIENT_ID: z.string()
});

export const env = envSchema.parse(process.env);
