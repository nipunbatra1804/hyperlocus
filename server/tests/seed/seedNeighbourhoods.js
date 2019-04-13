const { Estate } = require("../../models");
const crs = { type: "name", properties: { name: "EPSG:4326" } };

const createNeighbourhoods = async () => {
  try {
    const geoNeighborhoods = require("./npc-boundary.json");
    const npc = geoNeighborhoods.features;
    await Promise.all(
      npc.map(async elem => {
        await Estate.create({
          name: elem.properties["NPC_NAME"]
            .replace(/Police\s+Centre/i, "")
            .trimRight(),
          type: "1-RM",
          medRent: 1700,
          location: {
            type: "Polygon",
            coordinates: elem.geometry.coordinates,
            crs: crs
          }
        });
      })
    );
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = createNeighbourhoods;
