const mongodb = require("../data/database");

beforeAll((done) => {
  process.env.NODE_ENV = "test";
  mongodb.initDb((err) => {
    if (err) return done(err);
    done();
  });
});

afterAll(async () => {
  const db = mongodb.getDatabase();
  await db.close();
});
