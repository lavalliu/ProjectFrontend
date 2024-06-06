const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

app.use(express.static('public'));

app.set("view engine", "ejs");

// app.set("views", __dirname + "/views");

// app.set("public", __dirname + "/public");

app.use('/public/images',express.static(path.join(__dirname, '/images')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));

app.get("/", (req, res) => {
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

app.get("/modifyitems", (req, res) => {
  res.render("modifyitems.ejs");
});

// app.get("/navbar", (req, res) => {
//   res.render("navbar.ejs");
// });

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

const port = 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`server listening on ${port}`);
});
