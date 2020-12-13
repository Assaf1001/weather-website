const express = require("express");
const path = require("path");
const hbs = require("hbs");
const getWeather = require("./utils/getWeather");

const app = express();
const port = process.env.PORT || 3000;

// Define paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Assaf AspeO Harush",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Assaf AspeO Harush",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Assaf AspeO Harush",
    message: "I love to help bitches",
  });
});

app.get("/weather", async (req, res) => {
  const adress = req.query.adress;

  if (!adress) {
    return res.send({
      error: "You must provide an adress!",
    });
  }
  try {
    const { location, description, temperature, feelslike } = await getWeather(
      adress
    );
    res.send({ location, description, temperature, feelslike });
  } catch (error) {
    res.send({ error });
  }
});

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
  res.render("404", {
    title: "404",
    name: "Assaf AspeO Harush",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Assaf AspeO Harush",
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is connected, Port:", port);
});
