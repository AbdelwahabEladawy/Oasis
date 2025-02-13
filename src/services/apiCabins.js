import supabase from "./supabase";

export async function getCabins(params) {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded ");
  }

  return cabins;
}
