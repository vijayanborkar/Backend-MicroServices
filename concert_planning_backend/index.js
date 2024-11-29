const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createTour, getTour } = require("./controller/dataController");
const {
  getConcerts,
  getMerchandiseStalls,
  getAfterParties,
  getConcertsByArtistAndCity,
  getMerchandiseStallsByStallName,
  getAfterPartiesByCity,
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
app.get("/data/getConcertsByArtistAndCity", getConcertsByArtistAndCity);
app.get(
  "/data/getMerchandiseStallsByStallName",
  getMerchandiseStallsByStallName
);
app.get("/data/getAfterPartiesByCity", getAfterPartiesByCity);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database.", error);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
