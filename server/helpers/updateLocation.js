const axios = require("axios");
const crs = { type: "name", properties: { name: "EPSG:4326" } };
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const getLocation = async (address, postalcode) => {
  const MY_APP_ID = process.env.HERE_APP_ID;
  const MY_APP_CODE = process.env.HERE_APP_CODE;
  console.log(address);
  let coordinates = null;
  try {
    const apiString = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${MY_APP_ID}&app_code=${MY_APP_CODE} &searchtext=${address}+${postalcode}+Singapore`;
    console.log(apiString);
    const response = await axios.get(apiString);
    coordinates =
      response.data.Response.View[0].Result[0].Location.DisplayPosition;
    console.log(coordinates);
  } catch (err) {
    console.log(err.message);
  }
  return coordinates;
};

const updateLocation = async body => {
  const { location, address, postalCode } = body;
  if (!location) {
    const coordinates = await getLocation(address, postalCode);
    body.location = {
      type: "Point",
      coordinates: [coordinates["Longitude"], coordinates["Latitude"]],
      crs: crs
    };
  }
  return body;
};

module.exports = updateLocation;
