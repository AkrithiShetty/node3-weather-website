const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;

const request = require("request");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const publicDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectory));
3000;
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Akrithi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Robot",
    name: "Akrithi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Akrithi",
  });
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help",
    name: "Akrithi",
    message: "Help Article Not Found!!",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: " Provide the address" });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error: "Error!!!!!" });
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error: "Error!!!!!" });
          }
          res.send({
            Forecast: forecastData,
            location,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: " provide the details" });
  }
  console.log(req.query.search);
  res.send({ products: [] });
});
app.get("*", (req, res) => {
  res.render("404-page", {
    title: "Error!!",
    name: "Akrithi",
    message: "Page not found!!!",
  });
});
app.listen(port, () => {
  console.log("Server running in port no." + port);
});
