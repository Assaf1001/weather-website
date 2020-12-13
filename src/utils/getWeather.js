const getForecast = require("./forecast");
const getGeocode = require("./geocode");

const getWeather = async (adress) => {
  try {
    const { location, latitude, longitude } = await getGeocode(adress);
    const { description, temperature, feelslike } = await getForecast(
      latitude,
      longitude
    );
    return { location, description, temperature, feelslike };
  } catch (err) {
    throw err;
  }
};

module.exports = getWeather;
