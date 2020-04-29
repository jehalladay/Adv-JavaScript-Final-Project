'use strict';

const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const flash=require('connect-flash')
const session=require('express-session')
const passport=require('passport');
const logger = require('morgan');
const helmet = require('helmet')


//passport config
require('./config/passport')(passport);

//routes
const index=require('./routes/index');
const user=require('./routes/user');
//config db
const db=require('./config/mongo').MongoURI;


const app=express();
const PORT=3002;

if (process.argv.length > 2) {
    var hostname = process.argv[2];
} else {
    var hostname = "127.0.0.1";
};

// HTTP security
app.use(helmet())


//ejs
app.use(expressLayouts);
app.set('view engine','ejs');

//bodyparser
app.use(express.urlencoded({extended:false}));

// Console Event Logger
app.use(logger('dev'));

//express session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))

//messages flash
//we use flash meessege to  display whenever required
app.use(flash());

//global variable for messages
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg')
    res.locals.error_msg=req.flash('error_msg')
    res.locals.error=req.flash('error')
    next();
})

//serving css and js files
app.use('/public', express.static('public'));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use('/',index);
app.use('/user',user);

//mongodb connection
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('\tMongoDB Connected\n'));
    

app.listen(PORT, hostname,() => {
    console.log(`\nServer running at ${hostname}:${PORT}`);
});