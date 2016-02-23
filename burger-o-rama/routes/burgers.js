'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var burgers = express.Router();
var burgerData = [];

//Burger routes (collection)
burgers.route('/')
/*burger homepage*/
  .get((req, res)=>
    res.render('pages/burgers_all', {burgerData: burgerData}))
  /*create a new burger*/
  .post((req,res)=>{
    // insert our new burger into the collection
    burgerData.push(req.body)
    // redirect to the new item (in a db, you'd return the new id)
    var newID = burgerData.length-1;
    res.redirect('./'+ newID)
    // res.json(req.body)
  })

// show & create new burger form
burgers.get('/new', (req, res)=>
  res.render('pages/burger_edit', {
    burgerForm:{
      title:'Create your Dream Burger',
      burgerURL:'/burgers/',
      submitMethod:'post'
    }
  })
)

// view / edit / delete one burger
burgers.get('/:burgerID/edit', (req, res)=>
  res.render('pages/burger_edit', {
    burgerForm:{
      title:'Edit your Dream Burger',
      burgerURL:'/burgers/'+req.params.burgerID+'?_method=PUT',
      submitMethod:'post'
    }
  })
)

// single burgers
burgers.route('/:burgerID')
  .get((req, res)=>{
    var bID = req.params.burgerID;
    if(!(bID in burgerData)){
      res.sendStatus(404);
      return;
    }
    res.render('pages/burger_one', {
      burgerID:bID,
      burgerURL:'/burgers/'+bID,
      burgerData: burgerData[bID]})
  })
  /* one burger update */
  .put((req, res)=>{
    var bID = req.params.burgerID;
    console.log('PUUT', req.body)

    if(!(bID in burgerData)){
      res.sendStatus(404);
      return;
    }
    burgerData[bID] = req.body;
    res.redirect('./'+bID)
  })

  .delete((req, res)=>{
    var bID = req.params.burgerID;
    console.log('Delete', req.body)

    if(!(bID in burgerData)){
      res.redirect(303, '/burgers/');
      // res.sendStatus(404);
      return;
    }
    burgerData[bID] = req.body;
    // burgerData[bID].forEach
    burgerData.slice(bID, 1)
    console.log(burgerData)
    res.redirect(303, '/burgers/');
    // res.redirect('./'+bID)
  })
// vew the 'new burger' form



// view the 'edit burger' form







module.exports = burgers;
