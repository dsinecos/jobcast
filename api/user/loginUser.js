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
                console.log("user.admin value isqalto : " + user.admin);

                const payload = {
                    admin: user.isadmin,
                    data: "Is this data transmitted back and forth"
                };

                var token = jwt.sign(payload, 'superSecret', {
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