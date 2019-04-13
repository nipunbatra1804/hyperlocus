import hyperlocusApi from "./hyperlocusApi";

export async function getTowns(location) {
  try {
    if (!location) {
      const towns = await hyperlocusApi.get("/towns");
      return towns.data;
    }
  } catch (err) {
    console.log(err);
  }
}
