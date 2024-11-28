function validateFlightQueryParams(query) {
  const errors = [];
  if (!query.origin) {
    errors.push("Origin is required.");
  }
  if (!query.destination) {
    errors.push("Destination is required.");
  }
  return errors;
}

function validateHotelQueryParams(query) {
  const errors = [];
  if (!query.location) {
    errors.push("Location is required.");
  }
  return errors;
}

function validateSiteQueryParams(query) {
  const errors = [];
  if (!query.location) {
    errors.push("Location is required.");
  }
  return errors;
}

module.exports = {
  validateFlightQueryParams,
  validateHotelQueryParams,
  validateSiteQueryParams,
};
