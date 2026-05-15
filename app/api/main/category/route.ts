import { NextResponse } from "next/server";
import Category from "@/app/models/Category";
import connectDB from "@/app/lib/db/mongoose";
import { applyPopulate } from "@/app/lib/db/applyPopulate";

const BASE_SELECT = "name slug img_link";

type CategoryQuery = {
  $text?: {
    $search: string;
  };
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";

    const query: CategoryQuery = {};

    if (search) {
      query.$text = { $search: search };
    }

    await connectDB();

    const categories = await applyPopulate(
      Category.find(query).select(BASE_SELECT),
      [],
    );

    const response = NextResponse.json({
      data: categories,
      success: true,
    });

    return response;
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "Something went wrong",
      success: false,
    });
  }
}
