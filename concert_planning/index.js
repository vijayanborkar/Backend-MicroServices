const axiosInstance = require("./lib/axios");
require("dotenv").config();

axiosInstance
  .get("/health")
  .then((response) => console.log(response.data))
  .catch((error) => console.log("Error fetching the axios health", error));

const getConcerts = async (artist, city) => {
  try {
    const response = await axiosInstance.get("/concerts/search", {
      params: {
        artist: artist,
        city: city,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

getConcerts("Taylor Swift", "Las Vegas")
  .then((concert) => console.log("Concert Data", concert))
  .catch((error) => {
    console.log(error);
  });
