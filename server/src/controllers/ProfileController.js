const {User,PassProfile,PassSchedule,DriverProfile,DriverSchedule,DaysOfWeek} = require('../models')
const deepUpdate = require("sequelize-deep-update");

function updatePassSchedule (userJson){ // this replies to a register api request
    try {
        // save the schedule
        userJson.PassProfile.PassSchedules.forEach((delta) =>{
            let schedule = PassSchedule.findByPk(delta.id)
                .then((schedule) => schedule.update(delta))
                .then((schedule) => schedule.save())
        })
    } catch (err) {
        console.log(`An error occurred saving Passenger Schedule for user ${userJson.id} ${err}`)
        return res.status(500).send({
            error: `An error occurred saving Passenger Schedule for user ${userJson.id}`,
            original: err
        })
    }
}

function updateDriverSchedule (userJson){ // this replies to a register api request
    try {
        // save the schedule
        userJson.DriverProfile.DriverSchedules.forEach((delta) =>{
            let schedule = DriverSchedule.findByPk(delta.id)
                .then((schedule) => schedule.update(delta))
                .then((schedule) => schedule.save())
        })
    } catch (err) {
        console.log(`An error occurred saving Driver Schedule for user ${userJson.id} ${err}`)
        return res.status(500).send({
            error: `An error occurred saving Driver Schedule for user ${userJson.id}`,
            original: err
        })
    }
}

function checkPassProfile(user) {
    try {
        if (!user.PassProfile) {
            console.log('Creating Passenger Profile for ${user.email}')
            let profile = PassProfile.create({
                UserId: user.id,
                isActive: true
            })
            user.PassProfile = profile
        }
        let profile = user.PassProfile
        if (profile.PassSchedules && profile.PassSchedules.length == 0) {
            // now create the schedule
            console.log('Creating Passenger Schedule (outbound) for ${user.email}')
            for (var i = 1; i < 6; i++) {
                let out = PassSchedule.create({
                    PassProfileId: profile.id,
                    DaysOfWeekId: i,
                    leg: 1,
                    dep: '08:00',
                    arr: '09:00'
                })
                // profile.PassSchedules=[]    //  not happening auto
                profile.PassSchedules.push(out)
                // return leg
                let rtn = PassSchedule.create({
                    PassProfileId: profile.id,
                    DaysOfWeekId: i,
                    leg: 2,
                    dep: '17:00',
                    arr: '17:30'
                })
                profile.PassSchedules.push(rtn)
            }
        }
    } catch(err)  {
        console.log(`Error creating Passenger Profile/Schedule for user ${user.id}`)
    }
}

function checkDriverProfile(user) {
    try {
        if (!user.DriverProfile) {
            console.log('Creating Driver Profile for ${user.email}')
            let profile = DriverProfile.create({
                UserId: user.id,
                isActive: true
            })
            user.DriverProfile = profile
        }
        let profile = user.DriverProfile
        if (profile.DriverSchedules && profile.DriverSchedules.length == 0) {
            // now create the schedule
            console.log('Creating Driver Schedule (outbound) for ${user.email}')
            for (var i = 1; i < 6; i++) {
                let out = DriverSchedule.create({
                    DriverProfileId: profile.id,
                    DaysOfWeekId: i,
                    leg: 1,
                    dep: '08:00',
                    arr: '09:00'
                })
                // profile.PassSchedules=[]    //  not happening auto
                profile.DriverSchedules.push(out)
                // return leg
                let rtn = DriverSchedule.create({
                    DriverProfileId: profile.id,
                    DaysOfWeekId: i,
                    leg: 2,
                    dep: '17:00',
                    arr: '17:30'
                })
                profile.DriverSchedules.push(rtn)
            }
        }
    } catch(err)  {
        console.log(`Error creating Driver Profile/Schedule for user ${user.id}`)
    }
}

let count=1
module.exports = {
    async saveProfile(req, res) { // this replies to a register api request
        console.log('Req body',req.body)
        const userJson = req.body
        try {
            // console.log('user', user, 'count',count++)
            // const user = await User.findById(userId)
            const user = await User.findByPk(userJson.id)
                .then((user) => user.update(userJson) )
                .then((user) => user.save())

            if(userJson.isPassenger)
                updatePassSchedule(userJson)
            else
                updateDriverSchedule(userJson)

            return res.send({
                user: user.toJSON(), // send the new user object to front end
                // passProfile: passprofile.toJSON(),
                success: `Profile Saved for ${user.email}!`
            })
        } catch (err) {
            console.log(`An error occurred saving Passenger Profile for user ${userJson.id} ${err}`)
            return res.status(500).send({
                error: `An error occurred saving Passenger Profile for user ${userJson.id}`,
                original: err
            })
        }
    },
    async getProfile(req, res) { // this replies to a register api request
        const userId = req.params.userId
        try {
            console.log('userId', userId, 'count',count++)
            // const user = await User.findById(userId)
            const user = await User.findOne({
                where: {
                    id: userId
                },
                include: [
                    {
                        model: PassProfile,
                        include: [
                            {model: PassSchedule,
                                include:[ DaysOfWeek ]
                            }
                        ]
                    },
                    {
                        model: DriverProfile,
                        include: [
                            {model: DriverSchedule,
                                include:[ DaysOfWeek ]
                            }
                        ]
                    }
                ]
            })
            console.log('Found user', user)
            // if(user.isPassenger)
            //     checkPassProfile()
            // else
            //     checkDriverProfile()

            // let schedule = PassSchedule.create({
            //     PassProfileId: user.PassProfile.id,
            //     leg: 2,
            //     dep: '17:00',
            //     arr: '17:30'
            // })
            // console.log('Schedule',schedule)
            // const passProfile = await user.getPassProfiles()
            // console.log('Found Passenger Profile',passProfile)
            return res.send({
                user: user.toJSON(), // send the new user object to front end
                // passProfile: passprofile.toJSON(),
                success: `Profile Found for ${user.email}!`
            })
        } catch (err) {
            console.log(`An error occurred getting Profile for user ${userId} ${err}`)
            return res.status(500).send({
                error: `An error occurred getting Profile for user ${userId}`,
                original: err
            })
        }
    },
    async getPassSchedule(req, res) { // this replies to a register api request
        const profileId = req.params.profileId
        try {
            console.log(`server: Getting pass schedule for ${profileId}`)
            const schedule = await PassSchedule.findAll({
                where: {
                    PassProfileId: profileId
                },
                include: [
                  DaysOfWeek
                ],
                order: [
                    'DaysOfWeekId',
                    'leg'
                ]
            })
            return res.send({
                schedule: schedule, // send the new user object to front end
                // passProfile: passprofile.toJSON(),
                success: `Passenger Schedule Found for profile ${profileId}`
            })

        } catch (err) {
            console.log(`An error occurred getting Passenger Schedule for profile ${profileId} ${err}`)
            return res.status(500).send({
                error: `An error occurred getting Passenger Schedule for profile ${profileId}`,
                original: err
            })
        }
    }
}