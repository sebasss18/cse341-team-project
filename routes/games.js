const express = require("express");
const router = express.Router();

const gamesController = require("../controllers/games");
// const { moviesValidation, validate } = require("../middleware/validate");
// const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", gamesController.getAll);

router.get("/:id", gamesController.getSingle);

router.post(
  "/",
  // isAuthenticated,
  // moviesValidation(),
  // validate,
  gamesController.createGames,
);

router.put(
  "/:id",
  // isAuthenticated,
  // moviesValidation(),
  // validate,
  gamesController.updateGame,
);

router.delete("/:id", gamesController.deleteGame);

module.exports = router;
