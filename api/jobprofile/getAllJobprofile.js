var jobcastDatabaseClient = require('../../db/index.js');

module.exports = function (req, res, next) {

    // Get user_id
    // Get jobprofile_ids corresponding to the user_id
    // Get jobprofile corresponding to the user_ids

    var user_id = req.user_id;
    var jobprofileIDs = [];

    var SQLQuery = `SELECT jobprofile_id FROM jobcast_userjobprofile WHERE user_id=$1`;

    jobcastDatabaseClient.query(SQLQuery, [user_id])
        .then(function (data) {
            // console.log(JSON.stringify(data, null, "  "));
            // res.send("Done");

            for (var i = 0; i < data.length; i++) {
                jobprofileIDs.push(data[i]['jobprofile_id']);
            }

            console.log(jobprofileIDs);

            extractJobprofile();

        })
        .catch(function (error) {
            console.log("Error retrieiving jobprofile_ids from userjobprofile table");
            console.log(error);
        })

    function extractJobprofile() {

        var extractJobprofiles = [];

        for (var i = 0; i < jobprofileIDs.length; i++) {

            var SQLQuery = jobcastDatabaseClient.query('SELECT * FROM jobcast_jobprofile WHERE jobprofile_id=$1', [jobprofileIDs[i]]);

            extractJobprofiles.push(SQLQuery);
        }

        Promise.all(extractJobprofiles)
            .then(function (data) {
                console.log("Extraction of job profiles complete");
                console.log(data);
                res.json(JSON.stringify(data, null, "  "));
            })
            .catch(function (error) {
                console.log("Error while extracting job profiles")
                console.log(error);
                // res.send('Not done');
            })


    }


    // var SQLQuery = `SELECT * FROM jobcast_jobprofile`;

    // jobcastDatabaseClient.query(SQLQuery)
    //     .then(function (data) {
    //         console.log("Job profile data " + JSON.stringify(data, null, "  "));
    //         res.json(JSON.parse(JSON.stringify(data, null, "  ")));
    //         // res.send("Hoila Jamoila, All job profiles retrieved from database");
    //     })
    //     .catch(function (error) {
    //         console.log("Error retrieving all job profiles");
    //         console.log("Error");
    //         console.log(error);
    //     })

}