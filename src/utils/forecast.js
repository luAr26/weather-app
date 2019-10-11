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

        const {
          temperature,
          precipProbability
        } = body.currently;

        const {
          temperatureLow,
          temperatureHigh,
          summary
        } = body.daily.data[0];

        callback(undefined, {
          temperature,
          precipProbability,
          summary,
          temperatureHigh,
          temperatureLow
        });
      }
    }
  );
};

module.exports = forecast;