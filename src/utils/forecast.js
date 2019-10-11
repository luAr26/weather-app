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
        console.log(body.daily.data[0].temperatureHigh);
        console.log(body.daily.data[0].temperatureLow);
        const {
          temperature,
          precipProbability
        } = cc;
        callback(undefined, {
          temperature,
          precipProbability,
          summary: body.daily.data[0].summary,
          temperatureHigh: body.daily.data[0].temperatureHigh,
          temperatureLow: body.daily.data[0].temperatureLow
        });
      }
    }
  );
};

module.exports = forecast;