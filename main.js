const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

<<<<<<< HEAD
// set the view engine to ejs
app.set("view engine", "ejs");

// set the views folder
app.set("views", __dirname + "/views");

// set the public folder
app.use("/PUBLIC/", express.static("./PUBLIC/"));
=======
app.set('view engine', 'ejs');

const path = require('path');
app.set('views', path.join(__dirname, 'templates'));

app.use(express.static(path.join(__dirname, 'public')));
>>>>>>> 22be2b55f5395694cf8f65fc03859664b5b89770

//index page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("index");
});

app.get("/additems", (req, res) => {
  res.render("index");
});

app.get("/aperitifs", (req, res) => {
  res.render("index");
});

app.get("/cocktails", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("index");
});

app.get("/desserts", (req, res) => {
  res.render("index");
});

app.get("/displayresa", (req, res) => {
  res.render("index");
});

app.get("/hot", (req, res) => {
  res.render("index");
});

app.get("/listresas", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("index");
});

app.get("/maincourse", (req, res) => {
  res.render("index");
});

app.get("/modifyitems", (req, res) => {
  res.render("index");
});

app.get("/navbar", (req, res) => {
  res.render("index");
});

app.get("/order", (req, res) => {
  res.render("index");
});

app.get("/page", (req, res) => {
  res.render("index");
});

app.get("/payment", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("index");
});

app.get("/reservation", (req, res) => {
  res.render("index");
});

app.get("/soft", (req, res) => {
  res.render("index");
});

app.get("/starters", (req, res) => {
  res.render("index");
});

app.get("/update", (req, res) => {
  res.render("index");
});

app.get("/user", (req, res) => {
  res.render("index");
});

app.get("/wine", (req, res) => {
  res.render("index");
});

const port = 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`server listening on ${port}`);
});
