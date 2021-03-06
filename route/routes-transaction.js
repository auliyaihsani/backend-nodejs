'use strict';

module.exports = function (app) {
    var controller = require('../controller/transaction-controller');

    app.route('/transactions').get(controller.transactions);
    app.route('/transaction').post(controller.insert);
    app.route('/transaction/:id').get(controller.getById);
    app.route('/transaction').put(controller.updateTransaction);
    app.route('/transaction/:id').delete(controller.del);
};