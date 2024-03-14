var createError = require('http-errors');
var express = require('express');
const dotenv = require("dotenv").config();
const ExpressError = require("./utils/expressError");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
})

store.on("error", () =>{
  console.log("Session Store Error!", err);
})

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    express: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
};
app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
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


  // render the error page

app.all("*",(req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req,res, next) => {
  let {statusCode = 500, message} = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", {message})
  
});


module.exports = app;
