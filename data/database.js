const dotenv = require("dotenv");
dotenv.config();

const { MongoClient } = require("mongodb");

let database;

const initDb = (callback) => {
  if (database) {
    console.log("db is already initialized!");
    return callback(null, database);
  }

  // Use local MongoDB for Jest, real DB otherwise
  const uri =
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_URL
      : process.env.MONGODB_URI;

  MongoClient.connect(uri)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error("Database not initialized");
  }
  return database;
};

module.exports = { initDb, getDatabase };
