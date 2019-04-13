const { Place, Tag } = require("../../models");
const crs = { type: "name", properties: { name: "EPSG:4326" } };
const createTags = require("../seed/seedTags");

const createFoodOptions = async () => {
  const tags = await createTags();
  await Place.create(
    {
      category: "food",
      name: "Pizza Hut",
      type: "restaurant",
      address: "29 Kreta Ayer Road",
      postalCode: 88996,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.820383057662, 1.25134813803727],
        crs: crs
      }
    },
    { include: [Tag] }
  ).then(rest => rest.addTags([tags.tagFastFood, tags.tagKids]));
  await Place.create(
    {
      category: "food",
      name: "rice garden",
      type: "stall",
      address: "1 Jalan Kukoh",
      postalCode: 161001,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.81, 1.28],
        crs: crs
      }
    },
    { include: [Tag] }
  ).then(res => res.addTags([tags.tagHawker, tags.tagCheap]));
  await Place.create(
    {
      category: "food",
      name: "subway",
      type: "restaurant",
      address: "42/43 Pekin Street, FarEast Square",
      postalCode: 49959,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.955419467871, 1.3214476908532],
        crs: crs
      }
    },
    { include: [Tag] }
  ).then(res => res.addTags([tags.tagHealthier]));

  await Place.create(
    {
      category: "food",
      name: "Sushi Tei",
      type: "restaurant",
      address: "20 Cross Street",
      postalCode: 48422,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.894731355106, 1.31886941200841],
        crs: crs
      }
    },
    { include: [Tag] }
  ).then(res => res.addTags([tags.tagJapanese, tags.tagHealthier]));
};

module.exports = createFoodOptions;
