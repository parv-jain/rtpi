var nodemailer = require('nodemailer');
var fs = require('fs');
var hbs = require('nodemailer-express-handlebars');

var Product = require('../models/product');
var User = require('../models/user');

module.exports = function(app) {

    app.post('/sendMail', function(req, res) {

        var user = req.body.user;
        var product = req.body.product;

        var price_history_file = null;
        var current_price = null;
        var title = null;

        var useremail = null;
        var firstname = null;
        var lastname = null;
        function userData(userdata){
          if(userdata.google){
            useremail = userdata.google.email;
            firstname = userdata.google.firstname;
            lastname = userdata.google.lastname;
          }
          else if(userdata.fb){
            useremail = userdata.fb.email;
            firstname = userdata.fb.firstname;
            lastname = userdata.fb.lastname;
          }
          console.log(useremail);
          console.log("in");
        }
        console.log("out"+useremail);
        function productData(productdata){
          price_history_file = productdata.price_history_file;
          current_price = productdata.current_price;
          title = productdata.title;
          //console.log(title);
        }
        Product.findOne({'_id' : product},function(err,Products) {
          if(err)
            console.log(err);
          else{
            productData(Products);
          }
        });
        User.findOne({'_id' : user},function(err,Users) {
          if(err)
            console.log(err);
          else{
            userData(Users);
          }
        });

        var priceHistoryFile = require('../data/'+price_history_file+'.json');
        res.end(priceHistoryFile);
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
        current_price = parseInt(current_price);
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
            to: useremail,
            subject: 'Price Change Notification',
            template: 'priceChange',
            context: {
                username: firstname + lastname,
                product: title,
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
