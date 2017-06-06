  /**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');
const sessions = require('client-sessions');
var spawn = require("child_process").spawn;
const User = require('./models/User');
var yfinance = require('yfinance');



const upload = multer({ dest: path.join(__dirname, 'uploads') });
// Load environment variables from .env file, where API keys and passwords are configured.
 dotenv.load({ path: '.env.example' });
const app = express();

mongoose.connect ('localhost/stock-app-users');
/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));
app.use (sessions({
    cookieName : 'session' ,
    secret : 'jshfoiuahofghsoigoisjgjgshgrtijerwptjp',
    duration : 30 * 60 * 1000,
    activeDuration : 5 * 60 * 1000
}));

app.use((req,res,next) => {
  if (req.session && req.session.user) {
      User.findOne({email : req.session.user.email} , (err,user) => {
        if(user) {
          req.user = user;
          delete req.user.password;
          res.locals.user = user;
          req.session.user = user;
        }
        next();
      });
  } else {
    next();
  }
});

function reqLogin (req,res,next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
}
// function setCurrentStock (req , res , next) {
//   console.log(req.body.stock)
//   next()
// }

//Controllers (route handlers).
const homeController = require('./controllers/home');
const authController = require('./controllers/auth');
const portController = require('./controllers/portfolio');
const generalController = require('./controllers/general');

//configure routes
//auth
app.get('/' , homeController.index);
app.get('/login', authController.getLogin);
app.post('/login', authController.postLogin);
app.get('/signup' , authController.getSignup);
app.post('/signup' , authController.postSignup);
app.get('/logout' , authController.logout);

//portfolio management
app.get('/search-stock' , portController.stockHome);
app.post('/search-stock' ,  portController.stockSearch);
app.post("/port-home" ,reqLogin , portController.portHome);
app.post("/add-to-portfolio" , reqLogin , portController.addPortfolio)
app.get("/display-portfolio",reqLogin , portController.displayPortfolio)

//general
app.get('/general-info' ,generalController.info);

app.get('/general-form' ,generalController.generalForm);
app.post('/rest-handler' ,generalController.restHandler);
app.get('/scrapper' , generalController.scrapper);



//Start Express server.
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
