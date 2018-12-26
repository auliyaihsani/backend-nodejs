module.exports = (sequelize, type) => {
    return sequelize.define('transaction', {
        id: {
            field: 'id',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            field: 'type',
            type: type.STRING


        },
        amount: {
            field: 'amount',
            type: type.INTEGER

        },
        amountsign: {
            field: 'amountsign',
            type: type.STRING
        },
        accountid: {
            field: 'accountid',
            type: type.INTEGER,
            onDelete: 'CASCADE',

            references: {
                model: 'account',
                key: 'id'
            }
        }


    }, {
        tableName: 'transaction',
        timestamps: false
    })
}