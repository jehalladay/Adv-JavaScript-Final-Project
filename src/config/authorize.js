//authorize user before going to main page/quiz page
//i.e if user tries to access quiz page they have to login first

module.exports={
    ensureAuthenticated: function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg','please log in first');//here is the message
        res.redirect('/user/login');//it redirects to log in page
    }
}
