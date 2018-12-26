const uuid = require('uuid/v4');

module.exports = (sequelize, type) => {
    return sequelize.define('account', {
        id: {
            field: 'id',
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        opendate: {
            field: 'opendate',
            type: type.DATE
        },
        balance: {
            field: 'balance',
            type: type.INTEGER
        },
        customerid: {
            field: 'customerid',
            type: type.INTEGER,
            onDelete: 'CASCADE',

            references: {
                model: 'customer',
                key: 'id'
            }
        }

    }, {
        tableName: 'account',
        timestamps: false
    })
}