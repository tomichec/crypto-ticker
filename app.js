const express = require('express');
const app = express();
const request = require('request');

// from express 4.0 the body-parser needs to be installed separately and then invoked as follows
// https://stackoverflow.com/questions/9304888/how-to-get-data-passed-from-a-form-in-express-node-js/38763341#38763341
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set("view engine", "ejs");


var currencies = ["bitcoin", "litecoin", "monero"];

app.get('/', function (req, res) {
    // res.send('Hi there, welcome to crypto ticker!');
    res.render("home", {curList: currencies});    
});

app.post('/addCrypto', function (req, res) {
    var newCrypto = req.body.newCrypto;
    currencies.push(newCrypto);
    console.log('New cryptocurrency was added.');
    res.redirect('/');
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


