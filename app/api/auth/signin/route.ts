import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import connectDB from "@/app/lib/db/mongoose";
import { generateToken, setAuthCookie } from "@/app/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found", success: false });
    }

    if (!user.isActive) {
      return NextResponse.json({
        message: "User is not active",
        success: false,
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return NextResponse.json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = generateToken(user._id.toString());

    const response = NextResponse.json({
      success: true,
      user,
    });

    setAuthCookie(response, token);

    return response;
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
