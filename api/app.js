const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require ('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require("cors");
const loginRouter = require("./routes/login");


const app = express();

// db.getConnection(function(err,conn){
//   conn.query('Select * from user', function(err, result, fields){
//   console.log(result);
//   })
//   conn.end();
// });

  app.use(session ({
    secret: 'rfhufkhgio74tr1',
    resave:false,
    saveUninitialized: false,
    cookie: {
      maxAge:(1 * 3600000),
      httpOnly:false
    }
  }));


 //view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); 

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/isValidUser', loginRouter);
app.use('/login', loginRouter);
app.use('/isLoggedIn',loginRouter);
app.use('/loginCardAuth',loginRouter)
app.use('/logout',loginRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log("Im in app Error",err);

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
