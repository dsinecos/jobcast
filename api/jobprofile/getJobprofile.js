var jobcastDatabaseClient = require('../../db/index.js');

module.exports = function (req, res, next) {

    var jobProfileID = req.params.id;

    var SQLQuery = `SELECT * FROM jobcast_jobprofile WHERE jobprofile_id = $1`;

    jobcastDatabaseClient.query(SQLQuery, [jobProfileID])
        .then(function (data) {
            console.log("Data retrieved from the job profile table");
            res.json(JSON.parse(JSON.stringify(data, null, "  ")));
        })
        .catch(function (error) {
            console.log("Error retrieving job profile");
            console.log(error);
        })
}