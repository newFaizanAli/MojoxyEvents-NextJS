import { NextRequest, NextResponse } from "next/server";
import ResetToken from "@/app/models/ResetToken";
import User from "@/app/models/User";
import connectDB from "@/app/lib/db/mongoose";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { password, token } = await request.json();

    if (!token || !password) {
      return NextResponse.json({
        success: false,
        message: "Password and token required",
      });
    }

    const record = await ResetToken.findOne({ token });

    if (!record) {
      return NextResponse.json({
        success: false,
        message: "Toke is invalid or expired",
      });
    }

    if (record.expires < new Date()) {
      return NextResponse.json({ success: false, message: "Token expired" });
    }

    const email = record.email;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    user.password = password;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
