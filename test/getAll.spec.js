const app = require("../server");
const supertest = require("supertest");
const { expect } = require("@jest/globals");
const request = supertest(app);

describe("Test Handlers", () => {
  test("responds to /", async () => {
    const res = await request.get("/");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("responds to /guns", async () => {
    const res = await request.get("/guns");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });
});
