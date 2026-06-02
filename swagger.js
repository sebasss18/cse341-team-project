const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "QuickBuy Marketplace API",
    description: "API that provides CRUD operations for marketplace resources, MongoDB data storage, and GitHub authentication.",
  },
  host: "cse341-team-project-mlfj.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFiles, doc);