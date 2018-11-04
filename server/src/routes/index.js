const express = require('express');
const router = express.Router();

// the controller
const AuthenticationController = require('../controllers/AuthenticationController')
// validation for controller as middleware
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , message : 'Hello World I think' });
});

router.post('/register/' ,
    AuthenticationControllerPolicy.register, // validate in middleware
    AuthenticationController.register)   // pass request to the controller

module.exports = router;
