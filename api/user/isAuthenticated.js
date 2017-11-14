var jobcastDatabaseClient = require('../../db/index.js');
var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                console.log("This is the decoded information");
                console.log(decoded);

                var decodedInfo = jwt.decode(token, {complete: true});
                console.log(decodedInfo);
                
                next();
            }
        });
    } else {
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
}