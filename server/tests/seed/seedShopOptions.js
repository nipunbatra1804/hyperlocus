const { Place, Tag } = require("../../models");
const crs = { type: "name", properties: { name: "EPSG:4326" } };
const createTags = require("../seed/seedTags");

const createShops = async () => {
  const tags = await createTags();
  await Place.create(
    {
      category: "retail",
      name: "ChinaTown Point",
      type: "Shopping Mall",
      address: "28 Kreta Ayer Road",
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
  ).then(rest => rest.addTags([tags.tagCheap]));
  await Place.create(
    {
      category: "retail",
      name: "Clarke Silly",
      type: "boutique",
      address: "1 Jalan Kukoh",
      postalCode: 161001,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.826013282121, 1.28000483731102],
        crs: crs
      }
    },
    { include: [Tag] }
  ).then(rest => rest.addTags([tags.tagRomance, tags.tagCheap]));
  await Place.create(
    {
      category: "retail",
      name: "ThoughtProvokes",
      type: "Showroom",
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
  ).then(res => res.addTags([tags.tagHealthier, tags.tagHipster]));

  await Place.create(
    {
      category: "retail",
      name: "Googlie",
      type: "Showroom",
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
  ).then(rest => rest.addTags([tags.tagJapanese, tags.tagHealthier]));
};

module.exports = createShops;
