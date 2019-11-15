module.exports = function(req, res, next) {
    const { session } = req;

    if(!session.user) {
        session.user = {user_id: '' }
    }
    next()
}