require("dotenv").config();

const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models");
const createTowns = require("../seed/seedTowns");

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
      console.log(towns);
      towns.forEach((elem, index) => {
        expect(elem.town).toBe(expected[index].town);
        expect(elem.town).toBe(expected[index].town);
      });
    };
    test("returns all towns", async done => {
      await request(app)
        .get("/towns")
        .expect(res => verifyTowns(res.body, expectedTowns))
        .expect(200);

      done();
      //.expect(res => verifyTowns(res.body, expectedTowns), done);
    });
  });
});
