import axios from "axios";
import { env } from "../../config/env";
import { keycloakAdmin } from "../../config/keycloak";

/**
 * Get admin access token (master realm)
 */
export const getAdminToken = async (): Promise<string> => {
  const params = new URLSearchParams({
    client_id: env.KEYCLOAK_ADMIN_CLIENT_ID,
    username: env.KEYCLOAK_ADMIN_USERNAME,
    password: env.KEYCLOAK_ADMIN_PASSWORD,
    grant_type: "password",
  });

  const { data } = await axios.post(
    `${env.KEYCLOAK_BASE_URL}/realms/${env.KEYCLOAK_ADMIN_REALM}/protocol/openid-connect/token`,
    params,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
  );

  return data.access_token;
};

/**
 * Create user in Keycloak
 */
export const createUser = async (
  adminToken: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  await keycloakAdmin.post(
    `/users`,
    {
      username: email,
      email,
      firstName,
      lastName,
      enabled: true,
      emailVerified: false,
      credentials: [
        {
          type: "password",
          value: password,
          temporary: false,
        },
      ],
    },
    {
      headers: { Authorization: `Bearer ${adminToken}` },
    },
  );
};

/**
 * Get userId by email
 */
export const getUserIdByEmail = async (
  adminToken: string,
  email: string,
): Promise<string> => {
  const { data } = await keycloakAdmin.get(`/users`, {
    params: { email },
    headers: { Authorization: `Bearer ${adminToken}` },
  });

  if (!data.length) {
    throw new Error("User not found after creation");
  }

  return data[0].id;
};

/**
 * Assign user to default group
 */
export const assignUserToGroup = async (adminToken: string, userId: string) => {
  const { data: groups } = await keycloakAdmin.get(`/groups`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });

  const defaultGroup = groups.find((g: any) => g.name === "wally-users");

  if (!defaultGroup) {
    throw new Error("Default group wally-users not found");
  }

  await keycloakAdmin.put(
    `/users/${userId}/groups/${defaultGroup.id}`,
    {},
    {
      headers: { Authorization: `Bearer ${adminToken}` },
    },
  );
};

/**
 * Trigger email verification
 */
export const sendVerificationEmail = async (
  adminToken: string,
  userId: string,
) => {
  await keycloakAdmin.put(
    `/users/${userId}/execute-actions-email`,
    ["VERIFY_EMAIL"],
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      // params: {
      //   client_id: env.KEYCLOAK_PUBLIC_CLIENT_ID,
      //   redirect_uri: "http://localhost:3000", // can be any valid frontend URL
      // },
    },
  );
};
