const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode = require("./utilis/geocode");
const forecast = require("./utilis/forecast");

const publicDirectorypath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectorypath));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Abha",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Abha",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is help page",
    title: "Help",
    name: "Abha",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});
// res.send({
//   address: req.query.address,
//   forecast: "It is snowing",
//   location: "Bangalore",

// })

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("my404", {
    title: "404",
    name: "Abha",
    errorMessage: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("my404", {
    title: "404",
    name: "Abha",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
