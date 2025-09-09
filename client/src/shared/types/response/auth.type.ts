import type { User } from "@testonwheels/database";

export type AuthSignInResponseQuery = {
  access_token: string;
};

export type AuthLogoutResponseQuery = {
  message: string;
};

export type AuthDecoderResult = Pick<
  User,
  "id" | "name" | "email" | "imageUrl"
>;
