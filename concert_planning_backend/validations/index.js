function validateConcertQueryParams(query) {
  const errors = [];
  if (!query.artist) {
    errors.push("Artist is required.");
  }
  if (!query.city) {
    errors.push("City is required.");
  }
  return errors;
}

function validateMerchandiseStallQueryParams(query) {
  const errors = [];
  if (!query.stallName) {
    errors.push("Stall Name is required.");
  }
  return errors;
}

function validateAfterPartiesQueryParams(query) {
  const errors = [];
  if (!query.city) {
    errors.push("City is required.");
  }
  return errors;
}

module.exports = {
  validateConcertQueryParams,
  validateMerchandiseStallQueryParams,
  validateAfterPartiesQueryParams,
};
