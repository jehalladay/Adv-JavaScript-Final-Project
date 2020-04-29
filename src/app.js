'use strict';

const db = require('./config/mongo').MongoURI;
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash')
const http  = require('http');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const path  = require('path');
const session = require('express-session')


//routes
const index = require('./routes/index');
const user = require('./routes/user');


const port  = "1414";
const app = express();

function appSetup() {
    app.use(logger('dev'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', index);
    app.use('/user', user);
    
    //ejs
    app.use(expressLayouts);
    app.set('view engine','ejs');
    
    //bodyparser
    app.use(express.urlencoded({extended:false}));
    
    //express session
    app.use(session({
        secret:'secret',
        resave:true,
        saveUninitialized:true
    }));


    //messages flash
    //we use flash meessege to  display whenever required
    app.use(flash());
    
    //global variable for messages
    app.use((req,res,next)=>{
        res.locals.success_msg=req.flash('success_msg');
        res.locals.error_msg=req.flash('error_msg');
        res.locals.error=req.flash('error');
        next();
    })
    
    //serving style.css and quiz.js file file
    app.use('/public', express.static('public'));
    
    //passport config
    require('./config/passport')(passport);

    //passport middleware
    app.use(passport.initialize());
    app.use(passport.session());
    
    
}



function serverController(hostname) {
    const server = http.createServer(app);
    
    //mongodb connection
    mongoose.connect(db,{useNewUrlParser: true })
        .then(()=>console.log('mongodb conected'));

    server.listen(port, hostname, () => {
        console.log(`Server running at ${hostname}:${port}\n`);
    });
};


// Immediately Invoked Functional Expression (IIFE) executes the function
//  launch immediately upon startup:
//
// Function allows for using the IP address supplied in the second argument
(function launch() {
        if (process.argv.length > 2) {
            var hostname = process.argv[2];
		} else {
			var hostname = "127.0.0.1";
        };
        appSetup()
		serverController(hostname);
})();