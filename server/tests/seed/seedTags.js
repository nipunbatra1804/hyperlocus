const { FoodOption, Tag } = require("../../models");
const createTags = async () => {
  const [tagFastFood] = await Tag.findOrCreate({ where: { name: "fastFood" } });
  const [tagHealthier] = await Tag.findOrCreate({
    where: { name: "healthier" }
  });
  const [tagKids] = await Tag.findOrCreate({
    where: { name: "great for kids" }
  });
  const [tagHawker] = await Tag.findOrCreate({ where: { name: "hawker" } });
  const [tagCheap] = await Tag.findOrCreate({ where: { name: "cheap" } });
  const [tagJapanese] = await Tag.findOrCreate({ where: { name: "japanese" } });
  const [tagOncology] = await Tag.findOrCreate({ where: { name: "oncology" } });
  const [tagPathology] = await Tag.findOrCreate({
    where: { name: "pathology" }
  });
  const [tagPharmacy] = await Tag.findOrCreate({ where: { name: "pharmacy" } });
  const [tagPediatrics] = await Tag.findOrCreate({
    where: { name: "pediatrics" }
  });
  const [tagEmergency] = await Tag.findOrCreate({
    where: { name: "emergency" }
  });
  const [tagEldercare] = await Tag.findOrCreate({
    where: { name: "eldercare" }
  });
  const [tagRomance] = await Tag.findOrCreate({
    where: { name: "romance" }
  });
  const [tagHipster] = await Tag.findOrCreate({
    where: { name: "hipster" }
  });
  const [tagCouples] = await Tag.findOrCreate({
    where: { name: "couples" }
  });

  return {
    tagFastFood,
    tagHealthier,
    tagKids,
    tagHawker,
    tagCheap,
    tagJapanese,
    tagOncology,
    tagPathology,
    tagPharmacy,
    tagPediatrics,
    tagEmergency,
    tagEldercare,
    tagRomance,
    tagHipster,
    tagCouples
  };
};
module.exports = createTags;
