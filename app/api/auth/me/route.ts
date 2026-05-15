import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/models/User";
import { env_utils } from "@/app/utilities/env_utils";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null, success: false });
    }

    const decoded = jwt.verify(token, env_utils.JWT_SECRET!) as {
      id: string;
      iat: number;
      exp: number;
    };

    const user = await User.findById(decoded.id).select("-password");

    return NextResponse.json({ user });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ user: null, success: false });
  }
}
