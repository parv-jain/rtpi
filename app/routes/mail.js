var nodemailer = require('nodemailer');
var fs = require('fs');
var productDetails = require('../data/productDetails.json');
var hbs = require('nodemailer-express-handlebars');
module.exports = function(app) {

    app.post('/sendMail', function(req, res) {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rtpiservice@gmail.com',
                pass: 'rtpipassword'
            }
        });

        transporter.use('compile', hbs({
            viewEngine: {
                extname: '.hbs',
                layoutsDir: 'app/views/layout',
                defaultLayout: 'layout',
                partialsDir: 'app/views/layouts'
            },
            viewPath: 'app/views/email',
            extName: '.hbs',
        }));

        price_inc = "";
        price_dec = "";
        current_price = productDetails.current_price.replace(",", "");
        current_price = parseInt(current_price);
        last_price = productDetails.previous_prices.price1.replace(",", "");
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
                username: 'Aditya Tyagi',
                product: 'Sample Product Name',
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