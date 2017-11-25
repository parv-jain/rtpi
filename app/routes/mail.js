var nodemailer = require('nodemailer');
var fs = require('fs');
var hbs = require('nodemailer-express-handlebars');

var Product = require('../models/product');
var User = require('../models/user');

module.exports = function(app) {

    app.post('/sendMail', function(req, res) {

        var user = req.body.user;
        var product = req.body.product;

        Product.findOne({'_id' : product},function(err,Products) {
          if(err)
            console.log(err);
          else{
            //var priceHistoryFile = require('../data/'+Products.price_history_file+'.json');
            price_inc = "";
            price_dec = "";
            console.log(Products.current_price);
            console.log(Products.current_price.replace(/\,/g, ""));
            current_price = Products.current_price.replace(/\,/g, "");
            console.log(current_price);
            current_price = parseInt(current_price);
            console.log(current_price);
            var r = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
            last_price = current_price+r;
            last_price = parseInt(last_price);
            console.log(last_price);
            price_difference = current_price - last_price;
            if (price_difference > 0) {
                price_inc = price_difference;
            } else {
                price_dec = -price_difference;
            }

            User.findOne({'_id' : user},function(err,Users) {
              if(err)
                console.log(err);
              else{
                var mailOptions = {
                    from: 'realtimeproductinspector@gmail.com',
                    to: Users.google.email,
                    subject: 'Price Change Notification',
                    template: 'priceChange',
                    context: {
                        username: Users.google.firstName + ' ' + Users.google.lastName,
                        product: Products.title,
                        previous_price: last_price,
                        current_price: current_price,
                        price_inc: price_inc,
                        price_dec: r
                    }
                };
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'realtimeproductinspector@gmail.com',
                        pass: 'RTPIaccount'
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


                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) throw error;
                    else {
                        console.log({ "success": info.response });
                        res.render('mailsent', { title: '+1 Mail Sent', user: req.user });
                    }
                });

              }
            });

          }
        });

    });
}
