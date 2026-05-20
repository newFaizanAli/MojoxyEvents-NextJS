import { NextResponse } from "next/server";
import Category from "@/app/models/Category";
import connectDB from "@/app/lib/db/mongoose";
import { applyPopulate } from "@/app/lib/db/applyPopulate";
import { uploadFile } from "@/app/lib/db/supabase_upload";

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

export async function POST(request: Request) {
  try {
    await connectDB();

    const formData = await request.formData();

    const name = String(formData.get("name") || "");
    const slug = String(formData.get("slug") || "");
    const description = String(formData.get("description") || "");
    const genresRaw = formData.get("genres");

    const file = formData.get("img_link") as File | null;

    if (!name || !slug) {
      return NextResponse.json({
        success: false,
        message: "Name and slug are required",
      });
    }

    const existSlug = await Category.findOne({ slug }).lean();

    if (existSlug) {
      return NextResponse.json({
        success: false,
        message: "Slug already exists",
      });
    }

    let genres = [];

    if (genresRaw) {
      genres =
        typeof genresRaw === "string" ? JSON.parse(genresRaw) : genresRaw;
    }

    let imageUrl = "";

    if (file) {
      imageUrl = await uploadFile(file);
    }

    const category = await Category.create({
      name,
      slug,
      description,
      img_link: imageUrl,
      genres,
    });

    return NextResponse.json({
      data: category,
      message: "Category created successfully",
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
