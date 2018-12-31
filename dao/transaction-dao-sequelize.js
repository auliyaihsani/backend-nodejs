const {
    Transaction,
    Account,
    Customer
} = require('../db/sequelize');

var logger = require('../util/logging/winston-logger');

exports.getById = function getById(id, callback) {
    Transaction.findById(id)
        .then((transaction) => {
            return callback(null, transaction);
        })
        .catch((error) => {
            logger.error(error);
            return callback(error);
        })
};


exports.getAll = function getAll(callback) {
    Transaction.findAll({
            // include: [Account]
            include: [{
                model: Account,
                include: [Customer]
            }]
        })
        .then((transaction) => {
            return callback(null, transaction);
        })
        .catch((error) => {
            logger.error(error);
            return callback(error);
        })
};


exports.insert = function insert(data, callback) {
    let transaction = data;
    if (transaction.account == null && transaction.accountid == null) {
        res.json('account kosong');
    } else {
        if (transaction.accountid == null) {
            transaction.accountid = transaction.account.id;
        }
    }

    Transaction.create(transaction)
        .then(transaction => {
            return callback(null, transaction);
        })
        .catch((error) => {
            logger.error(error);
            return callback(error);
        })
};


exports.update = function update(id, data, callback) {
    let transaction = data;
    if (transaction.account == null && account.id == null) {
        res.json('account kosong');
    } else {
        if (transaction.id == null) {
            transaction.id = transaction.account.id;
        }
    }

    Transaction.update(data, {
            where: {
                id: data.id
            },
            returning: true,
            plain: true
        })
        .then(result => {
            logger.info('result update:');
            logger.info(result);
            return callback(null, data);
        })
        .catch((error) => {
            logger.error(error);
            return callback(error);
        })
};

exports.del = function del(id, callback) {
    Transaction.destroy({
            where: {
                id: id
            }
        })
        .then(result => {
            logger.info('result  update:');
            logger.info(result);
            return callback(null, id);
        })
        .catch((error) => {
            logger.error(error);
            return callback(error);
        })
};