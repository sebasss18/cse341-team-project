const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const mongodb = require("../data/database");

describe("Movies API", () => {
  let db;

  beforeAll(() => {
    db = mongodb.getDatabase().db();
  });

  beforeEach(async () => {
    await db.collection("movies").deleteMany({});
    await db.collection("movies").insertOne({
      title: "The Dark Knight",
      author: "Christopher Nolan",
      director: "Christopher Nolan",
      year: 2008,
      genre: "Action",
      rating: 9.0,
      durationMinutes: 152,
    });
  });

  test("GET /movies returns 200", async () => {
    const res = await request.get("/movies");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /movies/:id returns 200", async () => {
    const movie = await db.collection("movies").findOne({});
    const res = await request.get(`/movies/${movie._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("The Dark Knight");
  });
});
