module.exports = function(req, res, next){
    res.locals.isLogin = req.session.isAuthenticated

    next()
}