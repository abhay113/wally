import axios from "axios";
import { env } from "../../config/env";

const kc = axios.create({
  baseURL: env.KEYCLOAK_BASE_URL,
});

export const getAdminToken = async () => {
  const params = new URLSearchParams({
    client_id: env.KEYCLOAK_ADMIN_CLIENT_ID,
    username: env.KEYCLOAK_ADMIN_USERNAME,
    password: env.KEYCLOAK_ADMIN_PASSWORD,
    grant_type: "password",
  });

  const { data } = await kc.post(
    `/realms/${env.KEYCLOAK_ADMIN_REALM}/protocol/openid-connect/token`,
    params,
  );

  return data.access_token;
};

export const createUser = async (
  token: string,
  email: string,
  password: string,
) => {
  await kc.post(
    `/admin/realms/${env.KEYCLOAK_REALM}/users`,
    {
      username: email,
      email,
      enabled: true,
      credentials: [
        {
          type: "password",
          value: password,
          temporary: false,
        },
      ],
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

export const loginUser = async (email: string, password: string) => {
  const params = new URLSearchParams({
    client_id: env.KEYCLOAK_PUBLIC_CLIENT_ID,
    grant_type: "password",
    username: email,
    password,
  });

  const { data } = await kc.post(
    `/realms/${env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
    params,
  );

  return data;
};
