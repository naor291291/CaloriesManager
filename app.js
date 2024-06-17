const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const addcaloriesRouter = require('./routes/addcalories');
const reportRouter = require('./routes/report');
const aboutRouter = require('./routes/about');
const app = express();

// MongoDB connection string
const uri = "mongodb+srv://NaorAdi:Ronaldo23!@cluster0.qsrp3qi.mongodb.net/Caloris?retryWrites=true&w=majority";

// Connect to MongoDB using Mongoose with .then() and .catch()
mongoose.connect(uri)
    .then(() => {
      console.log('Connected to MongoDB!');
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err);
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addcalories', addcaloriesRouter);
app.use('/report',reportRouter);
app.use('/about',aboutRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
