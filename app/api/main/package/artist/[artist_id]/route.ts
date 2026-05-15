import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db/mongoose";
import { applyPopulate } from "@/app/lib/db/applyPopulate";
import Package from "@/app/models/Package";

export async function GET(
  request: Request,
  { params }: { params: { artist_id: string } },
) {
  try {
    const { artist_id } = await params;

    if (!mongoose.Types.ObjectId.isValid(artist_id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid artist id",
      });
    }

    await connectDB();

    const data = await applyPopulate(
      Package.find({
        artist: artist_id,
      }),
      [],
    );

    if (!data) {
      return NextResponse.json({
        success: false,
        message: "Package not found",
      });
    }

    return NextResponse.json(data);
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
