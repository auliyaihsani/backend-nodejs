var express = require('express'),
    app = express(),
    port = process.env.PORT || 6000,
    bodyParser = require('body-parser')
morgan = require('morgan');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// logging
var logger = require("./util/logging/winston-logger");

app.use(morgan('combined', {
    "stream": logger.stream
}));
logger.debug("Overriding 'Express' logger");

/** routes **/
var customerRoute = require('./route/routes-customer');
customerRoute(app);

var accountRoute = require('./route/routes-account');
accountRoute(app);

var accountRoute = require('./route/routes-transaction');
accountRoute(app);


/** start app **/
app.listen(port);
logger.debug('Learn Node JS With Kiddy, RESTful API server started on: ' + port);