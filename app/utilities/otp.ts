import "server-only";

import nodemailer from "nodemailer";
import { env_utils } from "./env_utils";

export const authCredentials = {
  user: env_utils.MAIL_USER || "",
  pass: env_utils.MAIL_PASS || "",
};

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: authCredentials,
});

export const otpStore: Record<string, string> = {};
