var response = require('../model/res');
var transactionDao = require('../dao/transaction-dao-sequelize')
var logger = require('../util/logging/winston-logger');
var util = require('util');


exports.transactions = function (req, res) {
    transactionDao.getAll(function (error, rows) {
        if (error) {
            logger.error('error with select' + error);
            response.err(error, res);

        } else {
            response.ok(rows, res)
        }
    });
}


exports.getById = function (req, res) {
    transactionDao.getById(req.params['id'], function (err, data) {
        if (err) {
            logger.error('error call get by id :' + err);
            response.err(err, res);
        }
        response.ok(data, res);
    });
}



exports.insert = function (req, res) {
    logger.info('request for insert :');
    logger.debug(req.body);
    transactionDao.insert(req.body, function (err, data) {
        if (err) {
            logger.error('error call insert:' + err);
            response.err(err, res);
        } else {
            response.ok('data inserted with id' + data.id, res);
        }
    });
}



exports.updateTransaction = function (req, res) {
    logger.info('request for update :');
    logger.debug(req.body);
    transactionDao.getById(req.body.id, function (err, data) {
        if (err) {
            logger.error('error call update' + err);
            response.err(err, res);
        } else if (data == null) {
            response.datanotfound('transaction not found', res);

        } else {
            transactionDao.update(req.body.id, req.body, function (err, data) {
                if (err) {
                    logger.error('call update' + err);
                    response.err(err, res);
                }
                response.ok('update data' + data.id, res)
            });
        }
    });
}


exports.del = function (req, res) {
    logger.info(util.format('deleting transaction id %s', req.params['id']));
    transactionDao.getById(req.params['id'], function (err, data) {
        if (err) {
            logger.error('error call get byid' + err);
            response.err(err, res);
        } else if (data == null) {
            response.datanotfound('transaction not found', res);
        } else {
            transactionDao.del(req.params['id'], function (err, data) {
                if (err) {
                    logger.error('error call delete : ' + err);
                    response.err(error, res);
                }
                response.ok('transaction deletedwith id' + data, res);
            });
        }
    });
}