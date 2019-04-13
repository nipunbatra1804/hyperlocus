const { Place, Tag, sequelize } = require("../../models");
const createShops = require("./../seed/seedShopOptions");

describe("Many To Many Association", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await createShops();
  });
  afterAll(async () => {
    await sequelize.close();
  });
  const printMagicMethods = modelInstance => {
    console.log(Object.keys(modelInstance.__proto__));
  };
  describe("Each Place has many tags", () => {
    test("should get manytags for a sample restaurant", async () => {
      const restaurant1 = await Place.findOne({
        where: { name: "Clarke Silly" }
      });

      let tags = await restaurant1.getTags();
      tags = tags.map(tag => tag.name);
      expect(tags).toEqual(expect.arrayContaining(["romance", "cheap"]));
    });

    test("should get manytags for another restaurant", async () => {
      const restaurant1 = await Place.findOne({
        where: { name: "Googlie" }
      });

      let tags = await restaurant1.getTags();
      tags = tags.map(tag => tag.name);
      expect(tags).toEqual(expect.arrayContaining(["healthier", "japanese"]));
    });
    test("should add a foodoptions tags", async () => {
      const restaurant1 = await Place.findOne({
        where: { name: "Googlie" }
      });
      const newTag = await Tag.create({
        name: "cozy"
      });
      await restaurant1.addTags([newTag]);
      let tags = await restaurant1.getTags();
      tags = tags.map(tag => tag.name);

      expect(tags).toEqual(
        expect.arrayContaining(["japanese", "healthier", "cozy"])
      );
    });
  });
  describe("tag has many food options", () => {
    test("should get all restaurants associated with a particular tag", async () => {
      const tag1 = await Tag.findOne({
        where: { name: "healthier" }
      });

      let shopOptions = await tag1.getPlaces();
      shopOptions = shopOptions.map(opt => opt.name);
      expect(shopOptions).toEqual(
        expect.arrayContaining(["ThoughtProvokes", "Googlie"])
      );
    });
  });
});
