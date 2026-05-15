import { NextRequest, NextResponse } from "next/server";
import Booking from "@/app/models/Booking";
import connectDB from "@/app/lib/db/mongoose";
import { idCreator } from "@/app/lib/db/idCreator";
import { getUserFromRequest } from "@/app/lib/auth/cookie";
import { applyPopulate } from "@/app/lib/db/applyPopulate";

const moduleCodeStr = "BOOK";

const BASE_SELECT = "_id booking_id";

const sanitizeObjectId = (value: string) =>
  value && value !== "" ? value : null;

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const booking_id = await idCreator({
      model: Booking,
      idStr: moduleCodeStr,
      idField: "booking_id",
    });

    const user = getUserFromRequest(request);

    const booking = new Booking({
      ...body,
      booking_id: booking_id,
      user: user?.userId,
      payment: sanitizeObjectId(body.payment),
      package: sanitizeObjectId(body.package),
      artist: sanitizeObjectId(body.artist),
    });

    await booking.save();

    const new_booking = await applyPopulate(
      Booking.findById(booking._id).select(BASE_SELECT),
      [],
    );

    const response = NextResponse.json({
      data: new_booking,
      success: true,
    });

    return response;
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
