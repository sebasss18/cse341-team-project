const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const mongodb = require("../data/database");

describe("Games API", () => {
  let db;

  beforeAll(() => {
    db = mongodb.getDatabase().db();
  });

  beforeEach(async () => {
    await db.collection("games").deleteMany({});
    await db.collection("games").insertOne({
      name: "The Legend of Zelda: ocarina of time(remastered)",
      releaseDate: "12/12/2026",
      platform: "Nintendo Switch 2",
      genre: "Action-Adventure, puzzle",
      description: "Link travels across Hyrule to defeat Ganon.",
      players: "single-player",
      type: "console",
    });
  });

  test("GET /games returns 200", async () => {
    const res = await request.get("/games");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /games/:id returns 200", async () => {
    const games = await db.collection("games").findOne({});
    const res = await request.get(`/games/${games._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("The Legend of Zelda: ocarina of time(remastered)")
  });
});
