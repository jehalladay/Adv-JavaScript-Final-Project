const express=require('express');
const app=express();
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const flash=require('connect-flash')
const session=require('express-session')
const passport=require('passport');
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
//serving style.css and quiz.js file file
app.use('/public', express.static('public'));

//passport config
require('./config/passport')(passport);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
const index=require('./routes/index');
const user=require('./routes/user');

const PORT=3000;

app.use('/',index);
app.use('/user',user);

//config db
const db=require('./config/mongo').MongoURI;

//mongodb connection
mongoose.connect(db,{useNewUrlParser: true })
    .then(()=>console.log('mongodb conected'));
    

app.listen(PORT,console.log("server running at 3000"));