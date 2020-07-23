const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a7d1ec5246748cf207e098b2977710d5&query=" +
    lat +
    "," +
    long +
    "&units=s";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("low level error", undefined);
    } else if (body.error) {
      console.log("Service Unavailable", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out. There is " +
          body.current.precip +
          " % chance of raining. The humidity percentage is " +
          body.current.humidity +
          " ."
      );
    }
  });
};

module.exports = forecast;
