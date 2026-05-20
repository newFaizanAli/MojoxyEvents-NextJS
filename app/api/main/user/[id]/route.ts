import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db/mongoose";
import { applyPopulate } from "@/app/lib/db/applyPopulate";
import User from "@/app/models/User";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid user id",
      });
    }

    await connectDB();

    const user = await applyPopulate(User.findById(id), []);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    return NextResponse.json(user);
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid user id",
      });
    }

    await connectDB();

    const payload = await request.json();

    const user = await User.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    return NextResponse.json({
      data: user,
      message: "User updated successfully",
      success: true,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid user id",
      });
    }

    await connectDB();

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    await user.deleteOne();

    return NextResponse.json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
