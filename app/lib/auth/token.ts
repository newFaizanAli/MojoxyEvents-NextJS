import jwt from "jsonwebtoken";
import { env_utils } from "@/app/utilities/env_utils";

export function generateToken(userId: string) {
  return jwt.sign({ id: userId }, env_utils.JWT_SECRET, { expiresIn: "7d" });
}
