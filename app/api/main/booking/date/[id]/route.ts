import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db/mongoose";
import { applyPopulate } from "@/app/lib/db/applyPopulate";
import Booking from "@/app/models/Booking";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid artist id",
      });
    }

    await connectDB();

    const artist_bookings = await applyPopulate(
      Booking.find({ artist: id }),
      [],
    );

    if (!artist_bookings) {
      return NextResponse.json({
        success: false,
        message: "Artist Booking not found",
      });
    }

    return NextResponse.json(artist_bookings);
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
