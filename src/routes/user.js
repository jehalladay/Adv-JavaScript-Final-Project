/* 
    routes for users page like login and register 
*/

const express = require('express');
const router=express.Router();
const { check, validationResult } = require("express-validator")
const { sanitizeBody } = require("express-validator")
const bcrypt=require('bcryptjs')
const passport=require('passport');
const User=require('../models/User');

//login
router.get('/login',(req,res)=>res.render('login'));
//quiz
router.get('/quiz',(req,res)=>res.render('quiz'));

router.post('/quiz',(req,res)=>{
    let newscore = new User({
       
        correct_answer:req.body.correct_answer
       
    });
    
   newscore.save(err=>{
        if(err)return next(err);
        else{
            req.flash('success_msg','you submited quiz')
            res.redirect("/user/login")
        }
    })
});

//register

router.get('/register',(req,res,next)=>res.render('register',{title:"Sign up"}));

//used express-validator for validiating fields like name,email,password
//handling rgister :- idea and code snippet taken from class or jupyter_Notebook
router.post('/register',
[
    check("name", "name must not be empty.")
        .isLength({ min: 4 })
        .trim(),
    // email must be valid
    check("email", "Not a valid email.")
        .isEmail()
        .trim(),
    //requirements for password
    check('password')
        .isLength({ min: 8 }).withMessage('should be atleast 8 character')
        .matches('[a-z]').withMessage('shuld have atleast one lowercase')
        .matches('[0-9]').withMessage('should conatain digit')
        .matches('[A-Z]').withMessage('should contain atleast one uppercase')
        .trim(),
    check("password2", "two passwords do not match")
        .exists()
        .custom((value, { req }) => value === req.body.password),
    ],
(req, res,next)=>{
    // extract the validation errors from a request
    const errors = validationResult(req)
    // check if there are errors
    if (!errors.isEmpty()) {
        
        let context = {
            title: "Sign up",
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            password2:req.body.password2,
            errors: errors.array()
            
        }
        res.render("register", context)
    } else 
    {
        // User.findOne({email:req.body.email})
        //     .then(user=>
        //         {
        //         if(user){
        //             msg="already used";
        //             let context = {
        //                 title: "Sign up",
        //                 name:req.body.name,
        //                 email:req.body.email,
        //                 password:req.body.password,
        //                 password2:req.body.password2,
        //                 errors: errors.array(),
                        
        //             }
        //             res.render("register", context)
        //         }
        //     })
        
        // create a user document and insert into mongodb collection
        let newuser = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            score:req.body.correct_answer
           
        });
            //store password by hashing 
        bcrypt.genSalt(10,(err,salt)=>
                    bcrypt.hash(newuser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newuser.password=hash;
                        newuser.save(err => {
                            if (err) {
                                return next(err)
                            }else{
                            // successful - redirect to login page
                            //console.log(req.body)
                            req.flash('success_msg','you are registered')
                            res.redirect("/user/login")}
                        })
                        
                    }))
        //console.log(newuser)
        
    }


});
//handling login
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/quiz',
        failureRedirect:'/user/login',
        failureFlash:true
    })(req,res,next);
});

//handling logouts
router.get('/logout',(req,res)=>{
    req.logout(); //call logout using passport middleware
    req.flash('success_msg','You are sucessufully logout');
    res.redirect('/user/login');
})
module.exports=router;