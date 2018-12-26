module.exports = (sequelize, type) => {
    return sequelize.define('customer', {
        id: {
            field: 'id',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: type.STRING,
        password: type.STRING,
        firsname: {
            field: 'firsname',
            type: type.STRING
        },
        lastname: {
            field: 'lastname',
            type: type.STRING
        },
        birthdate: {
            field: 'birthdate',
            type: type.STRING
        },
        phonetype: {
            field: 'phonetype',
            type: type.STRING

        },
        phonenumber: {
            field: 'phonenumber',
            type: type.STRING
        },
    }, {
        tableName: 'customer',
        timestamps: false
    })
}