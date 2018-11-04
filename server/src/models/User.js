module.exports = (sequelize,Datatypes) =>
    sequelize.define('User' , {
        email: {
            type: Datatypes.STRING,
            unique: true,
            allowNull : false
        },
        password : Datatypes.STRING
    })
