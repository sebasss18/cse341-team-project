const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const mongodb = require("../data/database");

describe("Guns API", () => {
  let db;

  beforeAll(() => {
    db = mongodb.getDatabase().db();
  });

  beforeEach(async () => {
    await db.collection("guns").deleteMany({});
    await db.collection("guns").insertOne({
      name: "Test Gun",
      manufacturer: "TestCo",
      category: "Rifle",
      caliber: "5.56",
      finish: "Black",
      price: 999,
      status: "Available",
    });
  });

  test("GET /guns returns 200", async () => {
    const res = await request.get("/guns");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /guns/:id returns 200", async () => {
    const gun = await db.collection("guns").findOne({});
    const res = await request.get(`/guns/${gun._id}`);
    expect(res.statusCode).toBe(200);
  });
});
