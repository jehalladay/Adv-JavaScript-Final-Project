//following are the routes for index page and main page

const express = require('express');
const router=express.Router();
const{ensureAuthenticated}=require('../config/authorize')

//welcome page
router.get('/',(req,res)=>res.render('welcome', {title: 'Planner'}));



//quiz page
router.get('/quiz',ensureAuthenticated,(req,res)=>res.render('quiz',{name:req.user.name, title: 'Planner'}));

module.exports=router;