const {User,
    PassProfile,PassSchedule,PassPickupPoints,
    DriverProfile,DriverSchedule,DriverWaypoints,
    DaysOfWeek} = require('../models')
// const deepUpdate = require("sequelize-deep-update");

function updatePassSchedule (res,userJson){ // this replies to a register api request
    try {
        if(!userJson.PassProfile || !userJson.PassProfile.PassSchedules) {
            console.log(`No passenger profile/schedule to save for user ${userJson.email}`)
            return res.status(500).send({
                error: `No passenger profile/schedule to save for user ${userJson.email}`
            })
            return
        }
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
function updatePassPickups (res,userJson){ // this replies to a register api request
    console.log('Saving passenger pickups')
    try {
        PassPickupPoints.destroy(
            { where: {
                PassProfileId : userJson.PassProfile.id } 
            }
        ).then( () => {
            // save the waypoints
            userJson.PassProfile.PassPickupPoints.forEach((wp) =>{
                if(!wp.PassProfileId) {
                    console.log('Patching wp.PassProfileId')
                    wp.PassProfileId = wp.PassProfile.id
                }
                // if(!wp.id) {
                console.log(`Re/Creating Waypoint ${wp.location}`)
                let schedule = PassPickupPoints.create(wp)
                // } else {
                //     console.log(`Updating Waypoint ${wp.location}`)
                //     let schedule = PassPickups.findByPk(wp.id)
                //         .then((schedule) => schedule.update(wp))
                //         .then((schedule) => schedule.save())
                // }
            })
        })
    } catch (err) {
        console.log(`An error occurred saving Pass Pickups for user ${userJson.email} ${err}`)
        return res.status(500).send({
            error: `An error occurred saving Pass Pickups for user ${userJson.email} ${err}`,
            original: err
        })
    }
}

function updateDriverSchedule (res,userJson){ // this replies to a register api request
    try {
        // save the schedule
        if(!userJson.DriverProfile || !userJson.DriverProfile.DriverSchedules) {
            console.log(`No driver profile/schedule to save for user ${userJson.email}`)
            return res.status(500).send({
                error: `No driver profile/schedule to save for user ${userJson.email}`
            })
            return
        }
        userJson.DriverProfile.DriverSchedules.forEach((delta) =>{
            let schedule = DriverSchedule.findByPk(delta.id)
                .then((schedule) => schedule.update(delta))
                .then((schedule) => schedule.save())
        })
    } catch (err) {
        console.log(`An error occurred saving Driver Schedule for user ${userJson.email} ${err}`)
        return res.status(500).send({
            error: `An error occurred saving Driver Schedule for user ${userJson.email}`,
            original: err
        })
    }
}

function updateDriverWaypoints (res,userJson){ // this replies to a register api request
    console.log('Saving driver waypoints')
    try {
        DriverWaypoints.destroy(
            { where: {
                DriverProfileId : userJson.DriverProfile.id } 
            }
        ).then( () => {
            // save the waypoints
            userJson.DriverProfile.DriverWaypoints.forEach((wp) =>{
                if(!wp.DriverProfileId) {
                    console.log('Patching wp.DriverProfileId')
                    wp.DriverProfileId = wp.DriverProfile.id
                }
                // if(!wp.id) {
                console.log(`Re/Creating Waypoint ${wp.location}`)
                let schedule = DriverWaypoints.create(wp)
                // } else {
                //     console.log(`Updating Waypoint ${wp.location}`)
                //     let schedule = DriverWaypoints.findByPk(wp.id)
                //         .then((schedule) => schedule.update(wp))
                //         .then((schedule) => schedule.save())
                // }
            })
        })
    } catch (err) {
        console.log(`An error occurred saving Driver Pickups for user ${userJson.email} ${err}`)
        return res.status(500).send({
            error: `An error occurred saving Driver Pickups for user ${userJson.email} ${err}`,
            original: err
        })
    }
}

function checkPassProfile(user) {
    console.log('Checking Driver Profile')
    try {
        if (!user.PassProfile) {
            console.log(`Creating Passenger Profile for ${user.email}`)
            let profile = PassProfile.create({
                UserId: user.id,
                isActive: true
            })
            user.PassProfile = profile
        }
        let profile = user.PassProfile
        if (profile.PassSchedules && profile.PassSchedules.length == 0) {
            // now create the schedule
            console.log(`Creating Passenger Schedule (out & rtn) for ${user.email}`)
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

async function checkDriverSchedule(user) {
    console.log(`Checking Driver Schedule : ${user.email}`)
    try {
        let profile = user.DriverProfile
        console.log('Profile', profile)
        if(!profile.DriverSchedules) {
            console.log('No driver schedule loaded - needs outer join')
            profile.DriverSchedules = []
        }
        if (profile.DriverSchedules && profile.DriverSchedules.length == 0) {
            // now create the schedule
            console.log(`Creating Driver Schedule (out & rtn) for ${user.email}`)
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
        console.log(`Error creating Driver Schedule for user ${user.id}`,err)
    }

}

async function checkDriverProfile(user) {
    console.log(`Checking Driver Profile : ${user.email}`)
    try {
        if (!user.DriverProfile) {
            console.log(`Creating Driver Profile for ${user.email}`)
            let profile = await DriverProfile.create({
                UserId: user.id,
                isActive: true
            })
            user.DriverProfile = profile
            checkDriverSchedule(user)
        }
    } catch(err)  {
        console.log(`Error creating Driver Profile for user ${user.id}`,err)
    }
}

let count=1
module.exports = {
    async saveProfile(req, res) { // this replies to a register api request
        console.log(`Saving Profile`,'Req body',req.body)
        const userJson = req.body
        try {
            // console.log('user', user, 'count',count++)
            // const user = await User.findById(userId)
            console.log('Saving user')
            const user = await User.findByPk(userJson.id)
                .then((user) => user.update(userJson) )
                .then((user) => user.save())

            if(userJson.isPassenger) {
                console.log('Saving passenger profile')
                updatePassSchedule(res,userJson)
                updatePassPickups(res,userJson)
            } else {
                console.log('Saving driver profile')
                updateDriverSchedule(res,userJson)
                updateDriverWaypoints(res,userJson)
            }


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
            // let user = await User.findByPk(userId)
            // reload user with extra data
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
                            },
                            {model: PassPickupPoints
                            }
                        ]
                    },
                    {
                        model: DriverProfile,
                        include: [
                            {model: DriverSchedule,
                                include:[ DaysOfWeek ]
                            },
                            {
                                model: DriverWaypoints
                            }
                        ]
                    }
                ]
            })
            console.log('Found user', user)
            if (user.isPassenger) {
                checkPassProfile(user)
            } else {
                checkDriverProfile(user)
            }

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