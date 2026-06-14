const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const mongodb = require("../data/database");

describe("Books API", () => {
  let db;

  beforeAll(() => {
    db = mongodb.getDatabase().db();
  });

  beforeEach(async () => {
    await db.collection("books").deleteMany({});
    await db.collection("books").insertOne({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Novel",
        year: 1925
    });
  });
    
    test("GET /books returns 200", async () => {
        const res = await request.get("/books");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("GET /books/:id returns 200", async () => {
        const books = await db.collection("books").findOne({});
        const res = await request.get(`/books/${books._id}`);
        expect(res.statusCode).toBe(200);
    });
});