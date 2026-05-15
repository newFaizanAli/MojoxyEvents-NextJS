import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db/mongoose";
import { applyPopulate } from "@/app/lib/db/applyPopulate";
import Artist from "@/app/models/Artist";

const BASE_SELECT =
  "stage_name img_link genres is_available is_featured is_verified genres";

type ArtistQuery = {
  $text?: {
    $search: string;
  };
  category?: mongoose.Types.ObjectId;
  is_featured?: boolean;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const is_featured = searchParams.get("is_featured") || false;

    const query: ArtistQuery = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (category && mongoose.Types.ObjectId.isValid(category)) {
      query.category = new mongoose.Types.ObjectId(category);
    }

    if (is_featured === "true") {
      query.is_featured = true;
    }

    await connectDB();

    const artists = await applyPopulate(
      Artist.find(query).select(BASE_SELECT),
      [],
    );

    const response = NextResponse.json({
      data: artists,
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
