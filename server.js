var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    morgan = require('morgan');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var cors = require('cors')
app.use(cors());

app.use(function (req, res, next) {
    res.header("accses-control-allow-origin", "*");
    res.header("accses-control-alowed-headers", "origin, X-requested-with, content-Type, accept");
    next();
})

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

var transactionRoute = require('./route/routes-transaction');
transactionRoute(app);


/** start app **/
app.listen(port);
logger.debug('Learn Node JS With Kiddy, RESTful API server started on: ' + port);