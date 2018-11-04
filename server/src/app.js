const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const parser = require('body-parser')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();


app.set('views', './src/views')
app.set('view engine', 'pug')

app.use(logger('dev'));
app.use(parser.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/register/' , (req,res) => {
    res.send({message : `Hello ${req.body.email}. Your user was registered` , body : req.body })
})

module.exports = app;
