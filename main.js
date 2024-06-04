const express=require('express');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.json());  // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));  // parse requests of content-type - application/x-www-form-urlencoded

app.set('view engine', 'ejs');

// const path = require('path');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

const path = require('path');
app.set('views', path.join('/', 'views'));

//index page
app.get('/', (req,res) => {
    res.render('index');
});

const port = 3001;
app.listen(port, '0.0.0.0', () => {
console.log(`server listening on ${port}`);
});