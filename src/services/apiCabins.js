import supabase, { supabaseUrl } from "./supabase";

export async function getCabins(params) {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded ");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // console.log(newCabin, id);

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // https://jbrgahnzynistyrhcvpu.supabase.co/storage/v1/object/public/cabin-images/0.5475973480415874_cabin-002.jpg
  // https://jbrgahnzynistyrhcvpu.supabase.co/storage/v1/object/public/cabin-images/0.839483279132234-cabin-002.jpg

  const imagePath = hasImagePath
    ? newCabin.image
    : ` ${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1-create / edit cabin
  let query = supabase.from("cabins");

  // A) Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  const { data, error } = await query.select().single();
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
