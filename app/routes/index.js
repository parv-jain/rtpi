// add all rotes here
module.exports = function(app){
  module.exports = require('./auth.js')(app);
  module.exports = require('./scrapping.js')(app);
  module.exports = require('./mail.js')(app);
}
