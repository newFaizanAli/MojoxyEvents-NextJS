import { NextRequest, NextResponse } from "next/server";
import speakeasy from "speakeasy";
import User from "@/app/models/User";
import { env_utils } from "@/app/utilities/env_utils";
import connectDB from "@/app/lib/db/mongoose";
import { authCredentials, transporter } from "@/app/utilities/otp";
import { OTPEXPIRETIME } from "@/app/utilities/constents";

export async function POST(
  request: NextRequest,
  { params }: { params: { action: string } },
) {
  try {
    await connectDB();

    const { action } = await params;

    const { email } = await request.json();

    const userExists = await User.findOne({ email });

    if (userExists && action === "signup") {
      return NextResponse.json({
        error: "User already exists",
        success: false,
      });
    }

    const otp = speakeasy.totp({
      secret: env_utils.OTP_SECRET,
      encoding: "base32",
      digits: 6,
      step: OTPEXPIRETIME,
    });

    const mailOptions = {
      from: authCredentials.user,
      to: email,
      subject: action === "signup" ? "MOJOXY - OTP Code" : "Reset Password OTP",
      html:
        action === "signup"
          ? `<p>Your OTP code is: <strong>${otp}</strong>. This code is valid for <strong>${OTPEXPIRETIME / 60} minutes</strong>.</p>`
          : `
                <h3>Password Reset</h3>
                <p>Your OTP is: <b>${otp}</b></p>
                <p>Valid for ${OTPEXPIRETIME / 60} minutes</p>
            `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: `An OTP code sent to  ${email}`,
      otp,
    });
  } catch (e) {
    return NextResponse.json({
      message: "Something went wrong",
      success: false,
    });
  }
}
