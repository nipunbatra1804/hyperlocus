const { Place, Tag, sequelize } = require("../../models");
const createHealthOptions = require("../seed/seedHealthOptions");

describe("Many To Many Association", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await createHealthOptions();
  });
  afterAll(async () => {
    await sequelize.close();
  });
  const printMagicMethods = modelInstance => {
    console.log(Object.keys(modelInstance.__proto__));
  };
  describe("Each Clinic has many tags", () => {
    test("should get manytags for a sample restaurant", async () => {
      const restaurant1 = await Place.findOne({
        where: { name: "Clarke Hospital" }
      });
      printMagicMethods(restaurant1);
      let tags = await restaurant1.getTags();
      tags = tags.map(tag => tag.name);
      console.log(tags);
      expect(tags).toEqual(expect.arrayContaining(["pharmacy", "cheap"]));
    });

    test("should add a foodoptions tags", async () => {
      const restaurant1 = await Place.findOne({
        where: { name: "ThoughtCares" }
      });
      const newTag = await Tag.create({
        name: "cozy"
      });
      await restaurant1.addTags([newTag]);
      let tags = await restaurant1.getTags();
      tags = tags.map(tag => tag.name);

      expect(tags).toEqual(
        expect.arrayContaining(["emergency", "pathology", "cozy"])
      );
    });
  });
  describe("tag has many food options", () => {
    test("should get all restaurants associated with a particular tag", async () => {
      const tag1 = await Tag.findOne({
        where: { name: "emergency" }
      });
      printMagicMethods(tag1);
      let healthOptions = await tag1.getPlaces();
      healthOptions = healthOptions.map(opt => opt.name);
      expect(healthOptions).toEqual(
        expect.arrayContaining(["ThoughtCares", "Googlie"])
      );
    });
  });
});
