const axios = require("axios");

const getForecast = async (latitude, longitude) => {
  const accessKey = "7ac601b85e0686b13a09e2b2f4536ede";
  const weatherURL = `http://api.weatherstack.com/current`;

  try {
    const res = await axios.get(weatherURL, {
      params: {
        access_key: accessKey,
        units: "m",
        query: `${latitude},${longitude}`,
      },
    });
    // console.log(latitude, longitude);
    if (!res.data.error) {
      const current = res.data.current;
      return {
        description: current.weather_descriptions[0],
        temperature: current.temperature,
        feelslike: current.feelslike,
      };
      // return `${current.weather_descriptions[0]}. It is currently ${current.temperature} degress out. \n It feels like ${current.feelslike} degress out.`;
    } else {
      throw {
        status: 404,
        message: "Unable to find location",
      };
    }
  } catch (err) {
    if (err.status === 404) {
      throw err.message;
    } else {
      throw "Unable to connect to weather services";
    }
  }
};

module.exports = getForecast;
