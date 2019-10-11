const request = require("request");

const geoCode = (location, callback) => {
  // console.log(encodeURIComponent(location), 'line4 geocode');

  const geoToken =
    "pk.eyJ1IjoibHVhcjI1IiwiYSI6ImNrMHY3ajNiejBheHMzaG9jNHI3NzZlYjMifQ.MyLl7Ma2NZDIW8vcUwVGXA";

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${geoToken}&limit=1`;

  request({
      url,
      json: true
    },
    (error, {
      body
    }) => {
      if (error) {
        callback({
          error: 'Unable to connect to the geocoding service.'
        });
      } else if (body.message) {
        callback({
          error: body.message
        });
      } else if (body.features.length === 0) {
        callback({
          error: 'Unable to find location.'
        });
      } else {
        const coords = body.features[0].center;
        const placeName = body.features[0]['place_name'];
        const [long, lat] = coords;
        callback(undefined, {
          lat,
          long,
          placeName
        });
      }
    }
  );
};

module.exports = geoCode;