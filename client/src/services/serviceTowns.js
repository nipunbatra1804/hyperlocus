import axios from "axios";
const inDev = process.env.NODE_ENV !== "production";

const hyperlocusApi = axios.create({
  baseURL: inDev
    ? "http://localhost:4000"
    : "http://hyperlocus-server.herokuapp.com"
});

export async function getTowns() {
  try {
    console.log(inDev);
    const foodOutlets = await hyperlocusApi.get("/towns");
    console.log(foodOutlets);
    return foodOutlets.data;
  } catch (err) {
    console.log(err);
  }
}
