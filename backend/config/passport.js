/*  I find passport.js very flexible and easy middleware for the uthentication 
    handled log in page using http://www.passportjs.org/packages/passport-local/
    used bcrypt for password hashing.
*/

//passport for log in using local strategy
const LocalStrategy=require('passport-local').Strategy

//we need bcrypt for comparing email ans password
const bcrypt=require('bcryptjs');

//mongoose
const mongoose=require('mongoose');

//user model
const User=require('../models/User');

 module.exports=function(passport){
     passport.use(new LocalStrategy({usernameField:'email'},(email,password,done)=>{
         //matching user from db
         User.findOne({email:email})
         .then(user=>{
             if(!user){
                 return done(null,false,{message:'This email is not registered'})
             }
             //matching password using bcrypt cuz password is stored in hash in db
             bcrypt.compare(password,user.password,(err,isMatch)=>{
                 if(err)throw err;
                 if (isMatch){
                     return done(null,user);
                }else{
                    return done(null,false,{message:'password incorrect'});
                }
             })
         })
     }))
     //for persistent login sessions serialize ans deserialize is used provided by passport.session()
     passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
 }
