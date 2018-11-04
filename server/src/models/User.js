module.exports = (sequelize,Datatypes) =>
    sequelize.define('User' , {
        email: {
            type: Datatypes.STRING,
            unique: true,
            allowNull : false
        },
        password: {
            type: Datatypes.STRING,
            allowNull : false
        },
        isDriver: {
            type: Datatypes.BOOLEAN
        },
        isPassenger: {
            type: Datatypes.BOOLEAN
        }
    })
