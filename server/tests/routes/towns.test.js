require("dotenv").config();

const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models");
const createTowns = require("../seed/seedTowns");
const createNeighbourhoods = require("../seed/seedNeighbourhoods");

describe("Towns", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await createTowns();
  });

  afterAll(async () => {
    await sequelize.close();
  });
  describe("[GET] list of towns", () => {
    const expectedTowns = [
      { name: "ANG MOH KIO", type: "1-RM", medRent: 1700 },
      { name: "CLEMENTI", type: "1-RM", medRent: 1900 },
      { name: "BUONA VISTA", type: "1-RM", medRent: 2700 }
    ];
    const verifyTowns = (towns, expected) => {
      towns.forEach((elem, index) => {
        expect(elem.town).toBe(expected[index].town);
        expect(elem.town).toBe(expected[index].town);
      });
    };
    test("returns all towns", async () => {
      const res = await request(app)
        .get("/towns")
        .expect(res => verifyTowns(res.body, expectedTowns))
        .expect(200);

      const amk = res.body.find(elem => elem.name.includes("ANG MOH KIO"));
      expect(amk.location.coordinates).toEqual(expect.any(Array));
    });
  });
  describe("[Get] neighbourhood by location", () => {
    beforeAll(async () => {
      await createNeighbourhoods();
    });
    test("returns all towns", async () => {
      const res = await request(app)
        .get("/towns")
        .send({
          location: { coordinates: [103.955419467871, 1.3214476908532] }
        })
        .expect(200);
      console.log(res.body);
    });
  });
});
