
// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// MongoDB

/*mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/products-demo');
mongoose.connection.on('error', function(){
    console.log('not connected');
});*/
var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://vargani:vargani#$#69@ds015636.mlab.com:15636/heroku_4mwp0w3r';
mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

// Express
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes/api'));

// Start server
var port = process.env.PORT || 5000
, host = process.env.YOUR_HOST || "127.0.0.1";
app.listen(port, host, function() {
  console.log('Express server listening on %d', port);
  console.log('Express server listening on %d', host);
});


