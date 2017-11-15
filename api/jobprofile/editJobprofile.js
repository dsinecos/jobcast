var jobcastDatabaseClient = require('../../db/index.js');

module.exports = function (req, res, next) {


    var companyName = req.body.companyName;
    var companyDescription = req.body.companyDescription;
    var jobTitle = req.body.jobTitle;
    var jobDescription = req.body.jobDescription;
    var jobProfileID = req.params.id;

    var user_id = req.user_id;

    var SQLQuery = `SELECT user_id FROM jobcast_userjobprofile WHERE jobprofile_id=$1`;

    jobcastDatabaseClient.query(SQLQuery, [jobProfileID])
        .then(function (data) {

            console.log("This is the data");
            console.log(JSON.stringify(data, null, "  "));
            var user_idFromTable = data[0].user_id;

            if (user_id === user_idFromTable) {
                updateJobprofile();
            } else {
                res.send("userid doesn't match");
                console.log("Userid didn't match");
            }

        })
        .catch(function (error) {
            console.log("Error while retrieving data from userjobprofile table");
            console.log(error);
        })

    function updateJobprofile() {

        var SQLQuery = `UPDATE jobcast_jobprofile SET companyname = $1, companydescription = $2, jobtitle = $3, jobdescription = $4 WHERE jobprofile_id = $5`;

        jobcastDatabaseClient.query(SQLQuery, [companyName, companyDescription, jobTitle, jobDescription, jobProfileID])
            .then(function (data) {
                console.log("Data updated in the respective job profile");
                res.send("Hoila Jamoila, Jobprofile updated inside database");
            })
            .catch(function (error) {
                console.log("Error updating job profile");
                console.log(error);
            })

    }

}