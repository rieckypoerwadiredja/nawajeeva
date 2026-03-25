import { supabase } from "./supabase";

export const uploadImage = async (file, type) => {
  const fileName = `${Date.now()}-${file.name}`;
  const path = `${type}/${fileName}`; // vegetative / generative

  const { error } = await supabase.storage
    .from("report-photo")
    .upload(path, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from("report-photo").getPublicUrl(path);

  return data.publicUrl;
};
