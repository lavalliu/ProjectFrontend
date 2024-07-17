const express = require("express");
const fastify = require('fastify')({ logger: true });
const path = require('path'); // hint from Akash :) 
const app = express();
const bodyParser = require("body-parser");
// require('dotenv').config({ path: 'project.env' });
const bcrypt = require('bcryptjs');

// const PORT = process.env.PORT || 3000;

// const backendUrl = process.env.BACKEND_URL;
// const emailAddress = process.env.EMAIL_ADDRESS;

// module.exports = {backendUrl};

app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

app.use(express.static('public'));

app.set('views', path.join(__dirname, '/public/views'));

app.set("view engine", "ejs");

app.use('/images',express.static(path.join(__dirname, 'public/images')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/index", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/additems", (req, res) => {
  res.render("additems.ejs");
});

app.get("/aperitifs", (req, res) => {
  res.render("aperitifs.ejs");
});

app.get("/cocktails", (req, res) => {
  res.render("cocktails.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/desserts", (req, res) => {
  res.render("desserts.ejs");
});

app.get("/displayresa", (req, res) => {
  res.render("displayresa.ejs");
});

app.get("/hot", (req, res) => {
  res.render("hot.ejs");
});

app.get("/listresas", (req, res) => {
  res.render("listresas.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/maincourse", (req, res) => {
  res.render("maincourse.ejs");
});

app.get("/loginadmin", (req, res) => {
  res.render("loginadmin.ejs");
});

app.get("/modifyitems", (req, res) => {
  res.render("modifyitems.ejs");
});

app.get("/order", (req, res) => {
  res.render("order.ejs");
});

app.get("/page", (req, res) => {
  res.render("page.ejs");
});

app.get("/payment", (req, res) => {
  res.render("payment.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/reservation", (req, res) => {
  res.render("reservation.ejs");
});

app.get("/soft", (req, res) => {
  res.render("soft.ejs");
});

app.get("/starters", (req, res) => {
  res.render("starters.ejs");
});

app.get("/update", (req, res) => {
  res.render("update.ejs");
});

app.get("/user", (req, res) => {
  res.render("user.ejs");
});

app.get("/wine", (req, res) => {
  res.render("wine.ejs");
});

app.get("/aboutmini", (req, res) => {
  res.render("aboutmini.ejs");
});

const port = 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`server listening on ${port}`);
});
