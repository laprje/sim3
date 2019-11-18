module.exports = function(req, res, next) {
    let { session } = req;

    if(!session.user) {
        session.user = {user_id: '' }
    }
    next()
}