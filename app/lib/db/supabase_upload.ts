import { supabase } from "../../utilities/supabase";
import { randomUUID } from "crypto";

export const uploadFile = async (
  file: File | null,
  folder: string = "category",
): Promise<string> => {
  if (!file) return "";

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${folder}/${randomUUID()}-${file.name}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, buffer, {
      contentType: file.type || "image/jpeg",
    });

  if (error) throw error;

  const { data } = supabase.storage.from("images").getPublicUrl(fileName);

  return data.publicUrl;
};

export const deleteFile = async (url: string): Promise<void> => {
  if (!url) return;

  try {
    const path = url.split("/images/")[1];

    if (path) {
      await supabase.storage.from("images").remove([path]);
    }
  } catch (err) {
    console.log("Supabase delete failed:", err);
  }
};
