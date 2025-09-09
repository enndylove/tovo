import type { NewUser } from "@testonwheels/database";

export type AuthSignInRequestQuery = Pick<NewUser, "email" | "password">;

export type AuthSignUpRequestQuery = Pick<
  NewUser,
  "name" | "email" | "password"
>;
