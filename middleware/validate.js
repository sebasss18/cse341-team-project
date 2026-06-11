const validator = require("../helpers/validate");

const saveGun = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    manufacturer: "required|string",
    category: "required|string",
    caliber: "required|string",
    finish: "required|string",
    price: "required|integer",
    status: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};
const { body, validationResult } = require("express-validator");

// This is my moviesValidation
const moviesValidation = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),

    body("author").trim().notEmpty().withMessage("Author is required"),

    body("director").trim().notEmpty().withMessage("Director is required"),

    body("year")
      .isInt({ min: 1888 })
      .withMessage("Year must be a valid number"),

    body("genre").trim().notEmpty().withMessage("Genre is required"),

    body("rating")
      .isFloat({ min: 0, max: 10 })
      .withMessage("Rating must be a number between 0 and 10"),

    body("durationMinutes")
      .isInt({ min: 1 })
      .withMessage("Duration must be a positive number"),
  ];
};
// Add your validation functions below
// Please use comments to separate each collection
// Follow the naming convention, collectionNameValidation
// this is my games validation
const gamesValidation = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name is required"),

    body("releaseDate").trim().notEmpty().withMessage("Release date is required"),

    body("platform").trim().notEmpty().withMessage("Platform is required"),

    body("genre").trim().notEmpty().withMessage("Genre is required"),

    body("description").trim().notEmpty().withMessage("Description is required"),

    body("players").trim().notEmpty().withMessage("Players is required"),

    body("type").trim().notEmpty().withMessage("Type is required"),
  ];
};

//Validation for books collection
const booksValidation = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),

    body("author").trim().notEmpty().withMessage("Author is required"),

    body("genre").trim().notEmpty().withMessage("Genre is required"),

    body("publishedYear")
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage("Published year must be a valid number"),
  ];
}



const validate = (req, res, next) => {
  console.log(req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  moviesValidation,
  gamesValidation,
  validate,
  saveGun,
  booksValidation
};
