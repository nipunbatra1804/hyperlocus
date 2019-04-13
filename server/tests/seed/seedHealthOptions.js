const { Place, Tag } = require("../../models");
const crs = { type: "name", properties: { name: "EPSG:4326" } };

const createTags = require("../seed/seedTags");

const createHealthOptions = async () => {
  const tags = await createTags();
  await Place.create(
    {
      category: "health",
      name: "ChinaTown Clinic",
      type: "private hospital",
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
  ).then(rest => rest.addTags([tags.tagEmergency]));
  await Place.create(
    {
      category: "health",
      name: "Clarke Hospital",
      type: "hospital",
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
  ).then(rest => rest.addTags([tags.tagPharmacy, tags.tagCheap]));
  await Place.create(
    {
      category: "health",
      name: "ThoughtCares",
      type: "clinic",
      address: "42/43 Pekin Street, FarEast Square",
      postalCode: 49959,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.955419467871, 1.3214476908532],
        crs: crs
      },
      tags: [{ name: "emergency" }]
    },
    { include: [Tag] }
  ).then(res => res.addTags([tags.tagEmergency, tags.tagPathology]));

  await Place.create(
    {
      category: "health",
      name: "Googlie",
      type: "clinic",
      address: "20 Cross Street",
      postalCode: 48422,
      openingTime: null,
      closingTime: null,
      location: {
        type: "Point",
        coordinates: [103.894731355106, 1.31886941200841],
        crs: crs
      },
      tags: [{ name: "eldercare" }]
    },
    { include: [Tag] }
  ).then(async rest => {
    const [tag, created] = await Tag.findOrCreate({
      where: { name: "emergency" }
    });
    await rest.addTags([tag]);
    return rest;
  });
};

module.exports = createHealthOptions;
