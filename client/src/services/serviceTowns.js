import hyperlocusApi from "./hyperlocusApi";

export async function getTowns(name) {
  try {
    if (!name) {
      const towns = await hyperlocusApi.get("/towns");
      return towns.data;
    }
    const towns = await hyperlocusApi.get(`/towns/${name}`);
    return towns.data;
  } catch (err) {
    console.log(err);
  }
}
