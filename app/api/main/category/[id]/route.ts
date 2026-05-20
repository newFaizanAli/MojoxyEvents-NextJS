import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db/mongoose";
import Category from "@/app/models/Category";
import {
  deleteFile,
  uploadFile,
  // UploadFileType,
} from "@/app/lib/db/supabase_upload";

const BASE_SELECT = "name slug img_link genres";

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

    const category = await Category.findById(id).select(BASE_SELECT);

    if (!category) {
      return NextResponse.json({
        success: false,
        message: "Category not found",
      });
    }

    return NextResponse.json(category);
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

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json({
        success: false,
        message: "Category not found",
      });
    }

    const formData = await request.formData();

    const file = formData.get("img_link") as File | null;

    const payload = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      img_link: formData.get("img_link"),
      genres: formData.get("genres"),
    };

    if (payload.slug) {
      const existCateg = await Category.findOne({
        slug: payload.slug,
        _id: { $ne: id },
      }).lean();

      if (existCateg) {
        return NextResponse.json({
          success: false,
          message: "Slug already exists",
        });
      }
    }

    let genres = [];

    if (payload.genres) {
      genres =
        typeof payload.genres === "string"
          ? JSON.parse(payload.genres)
          : payload.genres;
    }

    let imageUrl = category.img_link;

    if (file && file.size > 0) {
      if (category.img_link) {
        await deleteFile(category.img_link);
      }

      imageUrl = await uploadFile(file, "category");
    } else if (payload.img_link === "") {
      await deleteFile(category.img_link);
      imageUrl = "";
    }

    // // ---------- Update category ----------

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        ...formData,
        genres,
        img_link: imageUrl,
      },
      { new: true },
    );

    return NextResponse.json({
      data: updatedCategory,
      message: "Category updated successfully",
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
