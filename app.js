var createError = require('http-errors');
var express = require('express');
const dotenv = require("dotenv").config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expresssession = require("express-session");
const flash = require("connect-flash");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




app.use(flash());

app.use(expresssession({
  resave: false,
  saveUninitialized: false,
  secret: "miftah"
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.all("*",(req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req,res, next) => {
  let {statusCode = 500, message} = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", {message})
  
});

});

module.exports = app;
