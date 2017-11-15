var jobcastDatabaseClient = require('../../db/index.js');

module.exports = function (req, res, next) {

    var jobProfileID = req.params.id;

    var user_id = req.user_id;

    var SQLQuery = `SELECT user_id FROM jobcast_userjobprofile WHERE jobprofile_id=$1`;

    jobcastDatabaseClient.query(SQLQuery, [jobProfileID])
        .then(function (data) {

            console.log("This is the data");
            console.log(JSON.stringify(data, null, "  "));
            var user_idFromTable = data[0].user_id;

            if (user_id === user_idFromTable) {
                getJobprofile();
            } else {
                res.send("userid doesn't match");
                console.log("Userid didn't match");
            }

        })
        .catch(function (error) {
            console.log("Error while retrieving data from userjobprofile table");
            console.log(error);
        })


    function getJobprofile() {

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

}