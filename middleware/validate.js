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

module.exports = {
  saveGun,
};
