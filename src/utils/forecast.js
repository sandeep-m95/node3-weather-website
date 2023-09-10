const request = require("request");

const getWeatherForecast = (lat, long, callback) => {
  const api_key = "1feab4c98ad9d9d2f28be3876f3c193a";
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${lat},${long}&units=f`;

  request({ url: url, json: true }, (error, resp) => {
    if (error) {
      callback("some err occured", undefined);
    } else if (resp.body.error) {
      callback("Unable to find location", undefined);
    } else {
      let val = resp.body.current;
      let text = `${val.weather_descriptions[0]} , it feels like ${val.temperature} degress out`;
      callback(undefined, text);
    }
  });
};

module.exports = getWeatherForecast;
