const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2FuZGVlcC0yMSIsImEiOiJjbGFwZWowaXUxOG15M3B0YWdmNmtsZWllIn0.y6tvUMu5cz14uHgNyTYvRA&limit=1`;

  request({ url: url, json: true }, (error, resp) => {
    if (error) {
      callback("Some err occured", undefined);
    } else if (resp.body.features.length === 0) {
      console.log("No matching results");
      callback("No matching results", undefined);
    } else {
      let lat = resp.body.features[0].center[0];
      let long = resp.body.features[0].center[1];
      let data = {
        lat,
        long,
      };

      callback(undefined, data);
    }
  });
};

module.exports = geoCode;
