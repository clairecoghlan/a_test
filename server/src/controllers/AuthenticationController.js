const {User} = require('../models')

module.exports = {
    async register (req,res){ // this replies to a register api request
        try {
            const user = await User.create(req.body)  // create a user object from the email/paasword submitted
            res.send(user.toJSON())     // send the new user object to front end
        } catch(err) {
            res.status(400).send({
                error: 'This email account already in use' ,
                original: err
            })
        }
    },
    async login (req,res){ // this replies to a register api request
        try {
            const {email,password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })  //
            if (!user) {
                return res.status(403).send({
                    error: 'Invalid login details - bad email'
                })
            }
            if(password !== user.password) {
                return res.status(403).send({
                    error: 'Invalid login details - bad password'
                })
            }
            return res.send({
                message: 'Succesful login',
                user: user.toJSON()
            })     // send the new user object to front end
        } catch(err) {
            res.status(500).send({      // system error probably
                error: 'An error has occurred while logging in' ,
                original: err
            })
        }
    }
}