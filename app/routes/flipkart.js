var request = require('request'); // for creating http requests
var cheerio = require('cheerio'); // for web scrapping
var fs = require('fs'); // for the file system
var moment = require('moment');

module.exports = function(app) {

    // api to scrape flipkart products
    app.post('/flipkart', function(req, res) {
        var url = req.body.url;
        request(url, function(error, response, body) {
            if (!error) {
                var $ = cheerio.load(body);
                current_time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
                var json = {
                    title: "",
                    current_price: "",
                    mrp: "",
                    previous_prices: {
                        price1: "",
                        time1: ""
                    }
                };

                json.title = $("[class='_3eAQiD']").text();
                json.current_price = $("[class='_1vC4OE _37U4_g']").text().replace('₹', '');
                json.mrp = $("[class='_3auQ3N _16fZeb']").text().replace('₹', '');
                json.previous_prices.price1 = json.current_price;
                json.previous_prices.time1 = current_time;
            }
            res.json(json);

            // writing the changes to the file and this file will then be processed in mail.js
            fs.writeFile("app/data/productDetails.json", JSON.stringify(json, null, 4), function() {
                console.log('Details successfully fetched!');
            });
        });
    });

}