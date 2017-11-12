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
            current_price = parseInt(Products.currrent_price);
            last_price = current_price+40;
            last_price = parseInt(last_price);
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
                    from: 'rtpiservice@gmail.com',
                    to: Users.google.email,
                    subject: 'Price Change Notification',
                    template: 'priceChange',
                    context: {
                        username: Users.google.firstName + ' ' + Users.google.lastName,
                        product: Products.title,
                        previous_price: parseInt(Products.current_price)+40,
                        current_price: parseInt(Products.current_price),
                        price_inc: price_inc,
                        price_dec: 40
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
