var response = require('../model/res');
var accountDao = require('../dao/account-dao-sequelize')
var logger = require('../util/logging/winston-logger');
var util = require('util');

exports.accounts = function (req, res) {
    accountDao.getAll(function (error, rows) {
        if (error) {
            logger.error('error with select' + error);
            response.err(error, res);
        } else {
            response.ok(rows, res)
        }
    });
}

exports.ById = function (req, res) {
    accountDao.getById(req.params['id'], function (err, data) {
        if (err) {
            logger.error('error call get by id : ' + err);
            response.err(err, res);
        }
        response.ok(data, res);
    });
}

exports.insertAccount = function (req, res) {
    logger.info('request for insert :');
    logger.debug(req.body);
    accountDao.insert(req.body, function (err, data) {
        if (err) {
            logger.error('error call insert : ' + err);
            response.err(err, res);
        } else {
            response.ok('data inserted with id ' + data.id, res);
        }

    });
};

exports.updateAccount = function (req, res) {
    logger.info('request for update :');
    logger.debug(req.body);
    accountDao.getById(req.body.id, function (err, data) {
        if (err) {
            logger.error('error call update' + err);
            response.err(err, res);
        } else if (data == null) {
            response.datanotfound('account not found', res);
        } else {
            accountDao.update(req.body.id, req.body, function (err, data) {
                if (err) {
                    logger.error('call update' + err);
                    response.err(err, res);
                }
                response.ok('updated data' + data.id, res)
            });
        }
    });
}


exports.del = function (req, res) {
    logger.info(util.format('deleting account id %s', req.params['id']));
    accountDao.getById(req.params['id'], function (err, data) {
        if (err) {
            logger.error('error call get byid' + err);
            response.err(err, res);
        } else if (data == null) {
            response.datanotfound('account not found', res);
        } else {
            accountDao.del(req.params['id'], function (err, data) {
                if (err) {
                    logger.error('error call delete : ' + err);
                    response.err(error, res);
                }
                response.ok('account deletedwith id' + data, res);
            });
        }
    });
}