var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require("path");

let mongoose = require('mongoose');

app.use(express.static( __dirname + '/PokemonAngular/dist' ));



app.listen(8000, function() {
    console.log("Pokemon API listening on port 8000");
});