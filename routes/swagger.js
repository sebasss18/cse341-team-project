const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.get("/", (req, res) => {
  res.send("QuickBuy Marketplace");
});

// Add your collection routes here 
router.use("/movies", require("./movies"));

module.exports = router;