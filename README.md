# CRYPTOTICKER
## Description 

An app to asses the value of cryptocurrencies

## Installation

Clone the repository and run the `npm install` command inside the repository. This will install required npm packages. 

## Running

Launch `node app.js` to start a express server on the port 3000. Open the web browser on http://localhost:3000 to show the pages. By default the page shows the exchange rate of Bitcoin, Litecoin and Monero (obtained from API at coinmarketcap.com). Additional currencies can be added by entering the ID of the cryptocurrency (as used at coinmarketcap.com). 

The currencies IDs are saved in a variable on the server side. The calculation is performed clientside for the sake of users privacy.

