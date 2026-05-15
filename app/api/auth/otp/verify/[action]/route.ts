import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import connectDB from "@/app/lib/db/mongoose";
import ResetToken from "@/app/models/ResetToken";
import { OTPEXPIRETIME } from "@/app/utilities/constents";
import { env_utils } from "@/app/utilities/env_utils";
import speakeasy from "speakeasy";

export async function POST(
  request: NextRequest,
  { params }: { params: { action: string } },
) {
  try {
    await connectDB();

    const { action } = await params;

    const { otp, email }: { email: string; otp: string } = await request.json();

    const verified = speakeasy.totp.verify({
      secret: env_utils.OTP_SECRET,
      encoding: "base32",
      token: otp,
      digits: 6,
      step: OTPEXPIRETIME,
      window: 10,
    });

    if (verified) {
      if (action === "signup") {
        return NextResponse.json({ success: true });
      } else {
        const token = randomUUID();

        await ResetToken.create({
          email,
          token,
          expires: new Date(Date.now() + 15 * 60 * 1000),
        });

        return NextResponse.json({ success: true, token });
      }
    }

    return NextResponse.json({ success: false, message: "Invalid OTP" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "Something went wrong",
      success: false,
    });
  }
}
