const request = require("supertest");
const { User } = require("../../models");
const app = require("../../app");
jest.mock("jsonwebtoken");
const jwt = require("jsonwebtoken");


describe("/register works", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });
  const dummyUserAcceptable = {
    username: "nipunbatra",
    userEmail: "npb@example.com",
    password: "pass",
    category: "user"
  };
  const dummyUserRejected = {
    username: "nipunbatra",
    userEmail: null,
    password: "pass",
    category: "user"
  };

  test("should be able to register a new user", async done => {
    await request(app)
      .post("/auth/register")
      .send(dummyUserAcceptable)
      .expect(201);

    const createdUser = await User.findOne({
      username: dummyUserAcceptable.username
    });

    expect(createdUser.userEmail).toEqual(dummyUserAcceptable.userEmail);
    request(app)
      .post("/auth/register")
      .send(dummyUserAcceptable)
      .expect(303, done);
  });
  test("should not be able to register as a user", done => {
    request(app)
      .post("/auth/register")
      .send(dummyUserRejected)
      .expect(303, done);
  });
  test("should be able to login dummyUserAcceptable", async done => {
    const userToLogin = {
      username: dummyUserAcceptable.username,
      password: dummyUserAcceptable.password
    };
    await request(app)
      .post("/auth/login")
      .send(userToLogin)
      .expect(200);

    done();
  });
  test("should not be able to lgin as a dummyUserRejected", done => {
    const userToLogin = {
      username: dummyUserAcceptable.username,
      password: "rubbish"
    };
    request(app)
      .post("/auth/login")
      .send(userToLogin)
      .expect(303, done);
  });
});
