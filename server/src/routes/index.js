var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , message : 'Hello World I think' });
});

router.post('/register/' , (req,res) => {
    res.send({message : `Hello ${req.body.email}. Your user was registered` , body : req.body })
})

module.exports = router;
