import hyperlocusApi from "./hyperlocusApi";

export async function getRecommendation(query) {
  try {
    const recommendation = await hyperlocusApi.post(
      '/recommend', query
    );
    return recommendation.data;
  } catch (err) {
    console.log(err);
  }
}
