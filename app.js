const express = require('express');
const app = express();
const request = require('request');

app.set("view engine", "ejs");

app.get('/', function (req, res) {
    res.send('Hi there, welcome to crypto ticker!');
});

app.get("/results", function (req, res) {
    request("https://api.coinmarketcap.com/v1/ticker/",function (error, response, body){
	if (!error && response.statusCode == 200 ){
	    var data = JSON.parse(body);
	    res.render("results", {data: data});
	}
    });
});


app.get('/*', function (req, res) {
    res.send('Sorry, page not found...');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


