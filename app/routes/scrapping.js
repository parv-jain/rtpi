var request = require('request'); // for creating http requests
var cheerio = require('cheerio'); // for web scrapping

module.exports = function(app){

  // api to scrape flipkart products
  app.post('/flipkart', function(req, res){
    var url = req.body.url;
    request(url, function(error, response, body){
      if(!error){
        var $ = cheerio.load(body);
        var json = { title : "", current_price : "", mrp : ""};
        json.title = $("[class='_3eAQiD']").text();
        json.current_price = $("[class='_1vC4OE _37U4_g']").text().replace('₹', '');
        json.mrp = $("[class='_3auQ3N _16fZeb']").text().replace('₹', '');
      }
      res.json(json);
    })
  })

  // api to scrape amazon books
  app.post('/amazon/books/', function(req, res) {
      var url = req.body.url;
      request(url, function(error, response, html) {
          if (!error) {
              var $ = cheerio.load(html);
              var title, price, mrp;
              var json = {
                  title: "",
                  current_price: "",
                  mrp: ""
              };
              current_price = $("[class='a-size-medium a-color-price inlineBlock-display offer-price a-text-normal price3P']").text();
              // Throw away extra white space and non-alphanumeric characters.
              current_price = current_price.replace(/\s+/g, "");
              json.current_price = current_price;


              mrp = $("[class='a-color-secondary a-text-strike']").text();
              mrp = mrp.replace(/\s+/g, "");
              json.mrp = mrp;

              title = $("[id='productTitle']").text();
              json.title = title;

              res.json(json);
          }
      });
  });


  // api to get amazon products
  app.post('/amazon/products/', function(req, res) {
      var url = req.body.url;
      request(url, function(error, response, html) {
          if (!error) {
              var $ = cheerio.load(html);
              var title, price, mrp;
              var json = {
                  title: "",
                  current_price: "",
                  mrp: ""
              };
              current_price = $("[id='priceblock_saleprice']").text() || $("[id='priceblock_ourprice']").text();
              // Throw away extra white space and non-alphanumeric characters.
              current_price = current_price.replace(/\s+/g, "");
              json.current_price = current_price;


              mrp = $("[class='a-text-strike']").text();
              if (mrp) {
                  mrp = mrp.replace(/\s+/g, "");
              } else {
                  mrp = current_price;
              }

              json.mrp = mrp;

              title = $("[id='productTitle']").text();
              title = title.replace(/[^a-zA-Z ]/g, "").trim(0, 2);
              json.title = title;

              res.json(json);
          }
      });
  });
}
