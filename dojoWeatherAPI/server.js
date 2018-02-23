var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require("path");
app.use(express.static(path.join(__dirname, "./static")));

let mongoose = require('mongoose');

app.use(express.static( __dirname + '/weatherApiAngular/dist' ));

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./weatherApiAngular/dist/index.html"))
  });

app.listen(4200, function() {
    console.log("DojoWeatherAPI listening on port 4200");
});
