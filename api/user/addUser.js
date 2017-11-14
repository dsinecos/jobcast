var jobcastDatabaseClient = require('../../db/index.js');

module.exports = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var isAdmin = req.body.isAdmin;

    var SQLQuery = `INSERT INTO jobcast_users(username, password, isadmin) VALUES($1, $2, $3)`;

    jobcastDatabaseClient.query(SQLQuery, [username, password, isAdmin])
        .then(function (data) {
            console.log("User added in database");
            res.send("User added");
        })
        .catch(function (error) {
            console.log("Error adding user to database");
            console.log(error);
        })

}