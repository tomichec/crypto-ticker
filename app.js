const express = require('express');
const app = express();
const request = require('request');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set("view engine", "ejs");

app.use("/static/",express.static('public'));

var curs = ["bitcoin", "litecoin", "monero"];

app.get('/addCrypto', function (req, res) {
    res.render("home", {curList: curs});    
});

app.post('/addCrypto', function (req, res) {
    var newCrypto = req.body.newCrypto;
    curs.push(newCrypto);
    console.log('New cryptocurrency was added.');
    res.redirect('/');
});

app.get("/", function (req, res) {
    request("https://api.coinmarketcap.com/v1/ticker/",function (error, response, body){
	if (!error && response.statusCode == 200 ){
	    var data = JSON.parse(body);
	    var myData = [];
	    data.forEach(function(item, index){
		for (var i=0; i < curs.length; i++){
		    if (item['id'] == curs[i]){
			myData.push(item);
		    }
		}
	    });
	    res.render("results", {data: myData});
	}
    });
});


app.get('/*', function (req, res) {
    res.send('Sorry, page not found...');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


