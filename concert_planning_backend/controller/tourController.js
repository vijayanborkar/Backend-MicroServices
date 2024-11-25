const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: process.env.MICROSERVICE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    CLIENT_KEY: process.env.CLIENT_KEY,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
  },
});

const getConcerts = async (req, res) => {
  try {
    const response = await axiosInstance.get("/concerts", {
      headers: {
        CLIENT_KEY: process.env.CLIENT_KEY,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch concerts." });
  }
};

const getMerchandiseStalls = async (req, res) => {
  try {
    const response = await axiosInstance.get("/merchandiseStalls", {
      headers: {
        CLIENT_KEY: process.env.CLIENT_KEY,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch merchandise stalls." });
  }
};

const getAfterParties = async (req, res) => {
  try {
    const response = await axiosInstance.get("/afterParties", {
      headers: {
        CLIENT_KEY: process.env.CLIENT_KEY,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch after parties." });
  }
};

module.exports = { getConcerts, getMerchandiseStalls, getAfterParties };
