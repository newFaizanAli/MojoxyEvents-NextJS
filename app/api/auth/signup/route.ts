import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db/mongoose";
import User from "@/app/models/User";
import { generateToken, setAuthCookie } from "@/app/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { name, email, password, role, phone } = await request.json();

    const userExist = await User.findOne({ email });

    if (userExist) {
      return NextResponse.json({
        message: "User already exists",
        success: false,
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      phone,
    });

    if (user.role === "artist") {
      console.log("create artist");
    }

    const token = generateToken(user._id.toString());

    const response = NextResponse.json({
      message: "User created successfully",
      success: true,
    });

    setAuthCookie(response, token);

    return response;
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
