const axios = require("axios");

const getGeocode = async (adress) => {
  const mapBoxKey =
    "pk.eyJ1IjoiYXNzYWYxMDAxIiwiYSI6ImNrZnBoenJnazA5Y2UycXBidXh4eGVhZzYifQ.YjwvuQCDGoE65N1Vdc3xjw";
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress
  )}.json`;

  try {
    const res = await axios.get(url, {
      params: {
        access_token: mapBoxKey,
        limit: 1,
      },
    });

    if (res.data.features.length > 0) {
      const location = res.data.features[0].place_name;
      const latitude = res.data.features[0].center[1];
      const longitude = res.data.features[0].center[0];
      //   console.log(latitude, longitude);
      return { location, latitude, longitude };
    } else {
      throw {
        status: 404,
        message: "Location not found",
      };
    }
  } catch (err) {
    if (err.status === 404) {
      return err.message;
    } else {
      return "Unable to connect to weather services!";
    }
  }
};

module.exports = getGeocode;
