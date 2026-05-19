import { NextResponse } from "next/server";
import User from "@/app/models/User";
import connectDB from "@/app/lib/db/mongoose";
import { applyPopulate } from "@/app/lib/db/applyPopulate";

const BASE_SELECT = "name email isActive";

type UserQuery = {
  $or?: {
    name?: RegExp;
    email?: RegExp;
  }[];
};

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";

    const query: UserQuery = {};

    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    const users = await applyPopulate(
      User.find(query).select(BASE_SELECT).sort({ createdAt: -1 }),
      [],
    );

    return NextResponse.json({
      data: users,
      success: true,
    });
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      message: "Something went wrong",
      success: false,
    });
  }
}
