const request = require("request");
const forecast = function (latitude, longitude, callback) {
  const url =
    "http://api.weatherstack.com/current?access_key=2c2194aeb0fb8987d208ad13a597c33f&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  request({ url, json: true }, (error, response) => {
    //print temperature in fahrenheit
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        "it is currenty " +
          response.body.current.temperature +
          " degrees out. There is a " +
          response.body.current.precip +
          "% chance of rain"
      );
    }
  });
};
module.exports = forecast;
