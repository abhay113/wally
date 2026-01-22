import axios from "axios";
import { env } from "./env";

export const keycloakAdmin = axios.create({
  baseURL: `${env.KEYCLOAK_BASE_URL}/admin/realms/${env.KEYCLOAK_REALM}`,
  headers: {
    "Content-Type": "application/json"
  }
});
