var jobcastDatabaseClient = require('../../db/index.js');

module.exports = function (req, res, next) {

    var SQLQuery = `SELECT * FROM jobcast_jobprofile`;

    jobcastDatabaseClient.query(SQLQuery)
        .then(function (data) {
            console.log("Job profile data " + JSON.stringify(data, null, "  "));
            res.json(JSON.parse(JSON.stringify(data, null, "  ")));
            // res.send("Hoila Jamoila, All job profiles retrieved from database");
        })
        .catch(function (error) {
            console.log("Error retrieving all job profiles");
            console.log("Error");
            console.log(error);
        })

}