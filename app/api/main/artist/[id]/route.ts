import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db/mongoose";
import { applyPopulate } from "@/app/lib/db/applyPopulate";
import Artist from "@/app/models/Artist";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid artist id",
      });
    }

    await connectDB();

    const artist = await applyPopulate(Artist.findById(id), [
      {
        path: "category",
        select: "name slug img_link",
      },
    ]);

    if (!artist) {
      return NextResponse.json({ success: false, message: "Artist not found" });
    }

    return NextResponse.json(artist);
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
