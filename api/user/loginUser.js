var jobcastDatabaseClient = require('../../db/index.js');
var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var SQLQuery = `SELECT * FROM jobcast_users WHERE username=$1`;

    jobcastDatabaseClient.query(SQLQuery, [username])
        .then(function (data) {

            var user = data[0];

            if (user.password = password) {
                console.log("User authenticated");
                console.log("user.admin value isqalto : " + JSON.stringify(user, null, "  "));

                const payload = {
                    user_id: user.user_id
                };

                var token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: 1440 // expires in 24 hours
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });

            } else {
                console.log("User not authenticated");
                res.send("User not authenticated");
            }

        })
        .catch(function (error) {
            console.log("Error authenticating user");
            console.log(error);
        })

}