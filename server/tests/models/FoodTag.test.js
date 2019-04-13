const { Place, Tag, sequelize } = require("../../models");
const createFoodOptions = require("./../seed/seedFoodOptions");

describe("Many To Many Association", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await createFoodOptions();
  });
  afterAll(async () => {
    await sequelize.close();
  });
  const printMagicMethods = modelInstance => {
    console.log(Object.keys(modelInstance.__proto__));
  };
  describe("Each Restaurant has many tags", () => {
    test("should get manytags for a sample restaurant", async () => {
      const restaurant1 = await Place.findOne({
        where: { name: "Sushi Tei" }
      });
      let tags = await restaurant1.getTags();
      tags = tags.map(tag => tag.name);

      expect(tags).toEqual(expect.arrayContaining(["japanese", "healthier"]));
    });

    test("should get manytags for another restaurant", async () => {
      const restaurant1 = await Place.findOne({
        where: { name: "rice garden" }
      });
      let tags = await restaurant1.getTags();
      tags = tags.map(tag => tag.name);

      expect(tags).toEqual(expect.arrayContaining(["hawker", "cheap"]));
    });
    test("should add a foodoptions tags", async () => {
      const restaurant1 = await Place.findOne({
        where: { name: "Sushi Tei" }
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
      let foodOptions = await tag1.getPlaces();
      foodOptions = foodOptions.map(opt => opt.name);
      expect(foodOptions).toEqual(
        expect.arrayContaining(["Sushi Tei", "subway"])
      );
    });
  });
});
