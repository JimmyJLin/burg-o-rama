'use strict'

var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// var db = require('./db/pg');
var burgerRoutes = require(path.join(__dirname, '/routes/burgers'))

// app setting
var app = express();
var port = process.env.PORT || 3000;
app.listen(port,() => console.log('Sever up!'));

// parse incoming forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// override with POST having ?_method=xxxx
app.use(methodOverride('_method'))

// static route to public
app.use(express.static(path.join(__dirname, './public/')));

// log
app.use(logger('dev'));

/*Views*/
app.set('views', './views');
app.set('view engine', 'ejs');

/* ROUTES */
// Home route
app.get('/', (req,res)=>res.render('pages/home'));

// Burgers routes
app.use('/burgers', burgerRoutes);
