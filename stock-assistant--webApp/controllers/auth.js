const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');

//SignUp Controllers
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/signup', {
    title: 'Create Account'
  });
};
exports.postSignup = (req , res) => {
  var hashp = bcrypt.hashSync(req.body.password , bcrypt.genSaltSync(10));
  var hashcp = bcrypt.hashSync(req.body.confirmPassword , bcrypt.genSaltSync(10));
  var user = new User ({
    username : req.body.username,
    email : req.body.email,
    password : hashp,
    confirmPassword : hashcp
  });
  if (!bcrypt.compareSync(req.body.password,user.confirmPassword)) {
    res.render ('account/signup' , {error : "Email has already been taken OR Password fields don't match"}) ;
  } else {
    user.save((err) => {
        if (err) {
          var error = "OOPS!! Something bad happened...try again!!";
          if (err.code===11000) {
            error = "E-mail had already been taken!! try with a different one..";
          }
          res.render ('account/signup' , {error : error}) ;
        } else {
            req.session.user = user;
            res.locals.user = user;
            res.redirect("/search-stock");
        }
    })
  }
};


//ligin controllers
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/login', {
    title: 'Login'
  });
};
exports.postLogin = (req, res) => {
  var user = User.findOne({email : req.body.email} , (err , user) => {
    if(err) {
      res.render('account/login' , {title : 'Login' , error : 'OOPS!! Something unexpected happened..try again!'});
    } else {
      if (!bcrypt.compareSync(req.body.password,user.password)) {
        res.render ('account/login' , {error : "Incorrect Password!!"}) ;
      } else {
        req.session.user = user;
        res.locals.user = user;
        res.redirect("/search-stock");
      }
    }});
};
exports.logout = (req,res) => {
  req.session.reset();
  res.redirect('/login');
};
// exports.test = (req,res) => {
//   res.render('account/successful-signin-redirect');
// };
