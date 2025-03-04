import supabase, { supabaseUrl } from "./supabase";

export async function getCabins(params) {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded ");
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // https://jbrgahnzynistyrhcvpu.supabase.co/storage/v1/object/public/cabin-images/0.5475973480415874_cabin-002.jpg
  // https://jbrgahnzynistyrhcvpu.supabase.co/storage/v1/object/public/cabin-images/0.839483279132234-cabin-002.jpg

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("لم يتم إنشاء الكوخ.");
  }
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "cabins img not be uploaded and the cabin could not be created "
    );
  }

  return data;
}
// fdsjklhfsjklghsdgjksdgjk
export async function DeleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded ");
  }

  return data;
}
