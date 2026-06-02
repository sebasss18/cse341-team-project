const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Movies']
  try {
    const result = await mongodb.getDatabase().db().collection("movies").find();

    const movies = await result.toArray();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Movies']

  try {
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("movies")
      .findOne({ _id: movieId });

    if (!result) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMovie = async (req, res) => {
  //#swagger.tags=['Movies']
  try {
    const movie = {
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
      .collection("movies")
      .insertOne(movie);

    if (response.acknowledged) {
      res.status(201).send();
    } else {
      res.status(500).json(response.error || "Error creating movie.");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateMovie = async (req, res) => {
  //#swagger.tags=['Movies']
  try {
    const movieId = new ObjectId(req.params.id);

    const movie = {
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
      .collection("movies")
      .replaceOne({ _id: movieId }, movie);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json(response.error || "Error updating movie.");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMovie = async (req, res) => {
  //#swagger.tags=['Movies']
  try {
    const movieId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("movies")
      .deleteOne({ _id: movieId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json(response.error || "Error deleting movie.");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie,
};
