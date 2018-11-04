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

    }
}