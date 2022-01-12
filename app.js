const express = require('express')
const morgan = require('morgan');
const mysql= require('mysql');
const bodyParser = require('body-parser');



const app = express();
const PORT = process.env.PORT || 3000;

const mySQLString = "mysql://b64256d78a9063:8326ac7e@us-cdbr-east-05.cleardb.net/heroku_166199ff331728f?reconnect=true";
var con = mysql.createConnection({
    host: "us-cdbr-east-05.cleardb.net",
    user: "b64256d78a9063",
    password: "8326ac7e"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT coins FROM coinamounts WHERE id = ?",[] , function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });

app.get('/*', function (req,res) {
    res.sendFile(req.url, {root: './public'});
});

app
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .listen(PORT, () => console.log(`Our app is running  on port ${PORT}`));


