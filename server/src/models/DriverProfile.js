module.exports = (sequelize,Datatypes) =>
    sequelize.define('DriverProfile' , {
        isActive: Datatypes.BOOLEAN,
        location: Datatypes.STRING
        carReg: Datatypes.STRING,
        capacity: Datatypes.INTEGER
    })
// relationships defined in index!!