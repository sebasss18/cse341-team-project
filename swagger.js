const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "QuickBuy Marketplace API",
    description: "API that provides CRUD operations for marketplace resources, MongoDB data storage, and GitHub authentication.",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFiles, doc);