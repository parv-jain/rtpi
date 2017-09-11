// add all rotes here
module.exports = function(app) {
    module.exports = require('./auth.js')(app);
    module.exports = require('./amazon.js')(app);
    module.exports = require('./flipkart.js')(app);
    module.exports = require('./mail.js')(app);
}