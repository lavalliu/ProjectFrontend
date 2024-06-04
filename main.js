const express=require('express');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.json());  // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));  // parse requests of content-type - application/x-www-form-urlencoded


// const path = require('path');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

//index page
app.get('/', (req,res) => {
    res.render('index.ejs');
});

const port=3001;
app.listen(port, () => {
    console.log(`server listening on ${port}`);
});