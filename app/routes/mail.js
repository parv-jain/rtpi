var nodemailer = require('nodemailer');
module.exports = function(app){

  app.post('/sendMail', function(req, res){

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rtpiservice@gmail.com',
        pass: 'rtpipassword'
      }
    });

    /*
    Send HTML
    To send HTML formatted text in your email, use the "html" property instead of the "text" property
    */
    var mailOptions = {
      to: req.body.to,
      subject: req.body.subject,
      html: req.body.message
    }

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.json({"error": error});
      } else {
        res.json({"success": info.response});
      }
    });
  });
}
