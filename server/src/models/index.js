const fs = require('fs')
const path = require('path')
const {Sequelize} = require('sequelize')
const config=require('../config/config')
const db = {}   // this will be our database object - with all our models
const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

fs
    .readdirSync(__dirname)
    .filter((file)=>
        file !== 'index.js'
    )
    .forEach((file)=>{
        const model = sequelize.import(path.join(__dirname,file))
        db[model.name]=model
    })
console.log(db)


db.DriverProfile.belongsTo(db.User)
db.PassProfile.belongsTo(db.User)

db.PassPickupPoints.belongsTo(db.PassProfile)
db.DriverWaypoints.belongsTo(db.DriverProfile)

db.DriverSchedule.belongsTo(db.DriverProfile)
db.DriverSchedule.belongsTo(db.DaysOfWeek)  // FK for days of week

db.DriverTrips.belongsTo(db.DriverProfile)
db.DriverTrips.belongsTo(db.DaysOfWeek)  // FK for days of week
db.DriverTrips.belongsTo(db.Weeks)      // FK for week number
db.DriverTrips.belongsTo(db.DriverTripStatus)   // a status

db.PassSchedule.belongsTo(db.PassProfile)  // the pass profile
db.PassSchedule.belongsTo(db.DaysOfWeek)  // FK for days of week
db.PassSchedule.belongsTo(db.DriverProfile)      // the remembered driver

db.PassTrips.belongsTo(db.PassProfile)
db.PassTrips.belongsTo(db.DaysOfWeek)  // FK for days of week
db.PassTrips.belongsTo(db.Weeks)      // FK for week number
db.PassTrips.belongsTo(db.PassTripStatus)      // a status
db.PassTrips.belongsTo(db.DriverProfile)      // which driver
db.PassTrips.belongsTo(db.DriverTrips)      // which driver leg



db.sequelize=sequelize
db.Sequelize=Sequelize




module.exports = db


