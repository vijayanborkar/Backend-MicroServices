const {
  getFlightsByOriginAndDestination,
  getHotelsByLocation,
  getSitesByLocation,
} = require("../controllers/itineraryController");
const axiosInstance = require("../lib/axios.lib");

jest.mock("../lib/axios.lib.js", () => ({
  get: jest.fn(),
}));

describe("Itinerary Controller Tests", () => {
  test("should fetch flights by origin and destination", async () => {
    const mockResponse = {
      flights: [
        {
          id: 3,
          origin: "mopa",
          destination: "jammu",
          flight_number: "952",
          departure_time: "10/7/2024, 5:37:56 PM",
          arrival_time: "10/7/2024, 10:37:56 PM",
          price: 244.44,
        },
      ],
    };

    axiosInstance.get.mockResolvedValue(mockResponse);

    const req = { query: { origin: "mopa", destination: "jammu" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };
    await getFlightsByOriginAndDestination(req, res);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      `/flights/search?origin=mopa&destination=jammu`
    );
    expect(res.json).toHaveBeenCalledWith(mockResponse.data);
  });

  test("should fetch hotels by location", async () => {
    const mockResponse = {
      hotels: [
        {
          id: 207,
          name: "Radisson Hotel Agra",
          location: "Agra",
          price_per_night: 5716.0,
          available_rooms: 5,
        },
      ],
    };

    axiosInstance.get.mockResolvedValue(mockResponse);
    const req = { query: { location: "Agra" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };
    await getHotelsByLocation(req, res);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      `/hotels/search?location=Agra`
    );
    expect(res.json).toHaveBeenCalledWith(mockResponse.data);
  });

  test("should fetch sites by location", async () => {
    const mockResponse = {
      sites: [
        {
          id: 102,
          name: "Taj Mahal",
          location: "Agra",
          description:
            "The Taj Mahal is a white marble mausoleum in Agra, India that was built by Mughal emperor Shah Jahan in memory of his wife, Mumtaz Mahal",
        },
        {
          id: 301,
          name: "Agra Fort",
          location: "Agra",
          description:
            "A medieval complex and UNESCO World Heritage site that was the main residence of the Mughal emperors until 1638",
        },
      ],
    };

    axiosInstance.get.mockResolvedValue(mockResponse);

    const req = { query: { location: "Agra" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };
    await getSitesByLocation(req, res);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      `/sites/search?location=Agra`
    );
    expect(res.json).toHaveBeenCalledWith(mockResponse.data);
  });
});
