'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var burgers = express.Router();
var burgerData = [];

//Burger routes (collection)
burgers.route('/')
  // burger home page
  .get((req, res)=>
  res.render('pages/burgers_all', {burgerData: burgerData}))
  // create a new burger
  .post((req, res)=>{
    burgerData.push(req.body)
    console.log(burgerData)
    res.redirect('/burgers')
  })

// show & create new burger form
burgers.get('/new', (req, res)=>
  res.render('pages/burger_edit', {
    burgerData: burgerData
  })
)

// view / edit / delete one burger
burgers.get('/:burgerID/edit', (req, res)=>
  res.render('pages/burger_edit')
)

// burgers.route('/:burgerID')
// .get((req, res))=>
// res.render('pages/burger_one', {
//   burgerData: burgerData
// })

// vew the 'new burger' form



// view the 'edit burger' form







module.exports = burgers;
