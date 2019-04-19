const { Place, Tag } = require("../models");
const crs = { type: "name", properties: { name: "EPSG:4326" } };

const seedClinics = async () => {
  try {
    const geoNeighborhoods = require("./chas-clinics.json");
    const npc = geoNeighborhoods.features;
    await Promise.all(
      npc.map(async elem => {
        await Place.create({
          category: "health",
          name: elem.properties["HCI_NAME"],
          type: "clinic",
          address: `#${elem.properties["FLOOR_NO"]}-${
            elem.properties["UNIT_NO"]
          },${elem.properties["BLK_HSE_NO"]} ${
            elem.properties["STREET_NAME"]
          }`.replace("null", ""),
          postalCode: elem.properties["POSTAL_CD"],
          openingTime: "07:30",
          closingTime: "18:30",
          location: {
            type: elem.geometry.type,
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
const seedSuperMarkets = async () => {
  try {
    const geoNeighborhoods = require("./supermarkets-kml.json");
    const npc = geoNeighborhoods.features;
    await Promise.all(
      npc.map(async elem => {
        await Place.create({
          category: "retail",
          name: elem.properties["LIC_NAME"],
          type: "supermarket",
          address: `#${elem.properties["UNIT_NO"]},${
            elem.properties["BLK_HOUSE"]
          }, ${elem.properties["STR_NAME"]}`.replace("null", ""),
          postalCode: elem.properties["POSTCODE"],
          openingTime: "07:30",
          closingTime: "18:30",
          location: {
            type: elem.geometry.type,
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
const seedFoodOptions = async () => {
  try {
    const geoNeighborhoods = require("./healthier-eateries.json");
    const npc = geoNeighborhoods.features;
    await Promise.all(
      npc.map(async elem => {
        await Place.create({
          category: "food",
          name: elem.properties["Name"],
          type: "",
          address: `#${elem.properties["ADDRESSFLOORNUMBER"]}-${
            elem.properties["ADDRESSUNITNUMBER"]
          },${elem.properties["ADDRESSBLOCKHOUSENUMBER"]} ${
            elem.properties["ADDRESSSTREETNAME"]
          }`.replace("null", ""),
          postalCode: elem.properties["ADDRESSPOSTALCODE"],
          openingTime: "07:30",
          closingTime: "18:30",
          location: {
            type: elem.geometry.type,
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

module.exports = { seedClinics, seedSuperMarkets, seedFoodOptions };
