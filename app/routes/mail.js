var nodemailer = require('nodemailer');
var fs = require('fs');
var hbs = require('nodemailer-express-handlebars');

var Product = require('../models/product');
var User = require('../models/user');

module.exports = function(app) {

    app.post('/sendMail', function(req, res) {

        var user = req.body.user;
        var product = req.body.product;
        var userData = '';
        var productData = '';
        User.findOne({'_id' : user},function(err,userdata) {
          if(err)
            console.log(err);
          else
            userData = userdata;
        });
        Product.findOne({'_id' : product},function(err,productdata) {
          if(err)
            console.log(err);
          else
            productData = productdata;
        });
        var priceHistoryFile = require('../data/'+productData.price_history_file);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rtpiservice@gmail.com',
                pass: 'rtpipassword'
            }
        });

        transporter.use('compile', hbs({
            viewEngine: {
                extname: '.handlebars',
                layoutsDir: 'views/layouts',
                defaultLayout: 'email-layout',
                partialsDir: 'views/layouts'
            },
            viewPath: 'views/email',
            extName: '.handlebars',
        }));

        price_inc = "";
        price_dec = "";
        current_price = parseInt(productData.current_price);
        last_price = priceHistoryFile.price.replace(",", "");
        last_price = parseInt(last_price);
        price_difference = current_price - last_price;
        if (price_difference > 0) {
            price_inc = price_difference;
        } else {
            price_dec = -price_difference;
        }

        /*
        Send HTML
        To send HTML formatted text in your email, use the "html" property instead of the "text" property
        */

        // Fetching the data from the json file of the (user + product) and then comparing the price changes
        // The mail will be sent only when there is a price change (increase, decrease)


        var mailOptions = {
            from: 'rtpiservice@gmail.com',
            to: req.body.to,
            subject: 'Price Change Notification',
            template: 'priceChange',
            context: {
                username: userData.firstName + userData.lastName,
                product: productData.title,
                previous_price: last_price,
                current_price: current_price,
                price_inc: price_inc,
                price_dec: price_dec
            }
        };


        transporter.sendMail(mailOptions, function(error, info) {
            if (error) throw error;
            else {
                res.json({ "success": info.response });
            }
        });

    });
}
