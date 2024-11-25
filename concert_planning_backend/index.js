const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createTour, getTour } = require("./controller/dataController");
const {
  getConcerts,
  getMerchandiseStalls,
  getAfterParties,
} = require("./controller/tourController");
const { sequelize } = require("./models");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/tour", createTour);
app.get("/tour/:id", getTour);

app.get("/data/concerts", getConcerts);
app.get("/data/merchandiseStalls", getMerchandiseStalls);
app.get("/data/afterParties", getAfterParties);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected.");
  })
  .catch((error) => {
    console.log("Unable to connect to the database.", error);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
