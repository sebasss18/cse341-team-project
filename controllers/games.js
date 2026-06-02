const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Movies']
  try {
    const result = await mongodb.getDatabase().db().collection("games").find();

    const games = await result.toArray();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Games']

  try {
    const gameId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("games")
      .findOne({ _id: gameId });

    if (!result) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createGames = async (req, res) => {
  //#swagger.tags=['Games']
  try {
    const game = {
      title: req.body.title,
      author: req.body.author,
      director: req.body.director,
      year: req.body.year,
      genre: req.body.genre,
      rating: req.body.rating,
      durationMinutes: req.body.durationMinutes,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("games")
      .insertOne(game);

    if (response.acknowledged) {
      res.status(201).send();
    } else {
      res.status(500).json(response.error || "Error creating game.");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateGame = async (req, res) => {
  //#swagger.tags=['Games']
  try {
    const gameId = new ObjectId(req.params.id);

    const game = {
      title: req.body.title,
      author: req.body.author,
      director: req.body.director,
      year: req.body.year,
      genre: req.body.genre,
      rating: req.body.rating,
      durationMinutes: req.body.durationMinutes,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("games")
      .replaceOne({ _id: gameId }, game);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json(response.error || "Error updating game.");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteGame = async (req, res) => {
  //#swagger.tags=['Games']
  try {
    const gameId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("games")
      .deleteOne({ _id: gameId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json(response.error || "Error deleting game.");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createGames,
  updateGame,
  deleteGame,
};
