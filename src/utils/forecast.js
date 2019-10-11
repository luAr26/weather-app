const request = require('request');

const forecast = ({
  lat,
  long
}, callback) => {
  const url =
    `https://api.darksky.net/forecast/b6f41f457b3733eeb569ea20a205052c/${lat},${long}?units=si&lang=ro`;

  request({
      url,
      json: true
    },
    (error, {
      body
    }) => {
      if (error) {
        callback({
          error: 'Unable to connect to weather service.'
        });
      } else if (body.error) {
        callback({
          error: body.error
        });
      } else {
        const cc = body.currently;
        const {
          temperature,
          precipProbability
        } = cc;
        callback(undefined, {
          temperature,
          precipProbability,
          summary: body.daily.data[0].summary
        });
      }
    }
  );
};

module.exports = forecast;