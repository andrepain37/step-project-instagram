
module.exports = function(req, res, next){
    req.generateUrl = (url) => req.protocol + '://' +  req.get('host') + '/' + url
    next()
}