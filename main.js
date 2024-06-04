const express=require('express');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.json());  // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));  // parse requests of content-type - application/x-www-form-urlencoded

//index page
app.get('/', (req,res) => {
    res.render('/VIEWS/index.ejs');
});

const port=3001;
app.listen(port, () => {
    console.log(`server listening on ${port}`);
});