const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const getWeatherForecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sandeep Menon",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Sandeep Menon",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is a help page ",
    title: "Help",
    name: "Sandeep",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Address not provided");
  }

  geoCode(req.query.address, (err, { lat, long } = {}) => {
    if (err) {
      return req.send({ err });
    }

    getWeatherForecast(lat, long, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }
      res.send({
        forecast: forecastData,
        location: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("errorPage", {
    message: "No help article found",
  });
});

//rendering a 404 page , this route has to be provided at the end of the routing section

app.get("*", (req, res) => {
  res.render("errorPage", {
    message: "Oops , Page not found!",
  });
});

app.listen(port, () => {
  console.log("server is up!!!");
});
