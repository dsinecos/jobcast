var jobcastDatabaseClient = require('../../db/index.js');

module.exports = function (req, res, next) {

    var jobProfileID = req.params.id;

    // var SQLQuery = `UPDATE jobcast_jobprofile SET companyname = $1, companydescription = $2, jobtitle = $3, jobdescription = $4 WHERE jobprofile_id = $5`;
    var SQLQuery = `DELETE FROM jobcast_jobprofile WHERE jobprofile_id = $1`;

    jobcastDatabaseClient.query(SQLQuery, [jobProfileID])
        .then(function (data) {
            console.log("Data deleted in the job profile table");
            res.send("Hoila Jamoila, Jobprofile deleted inside database");
        })
        .catch(function (error) {
            console.log("Error deleting job profile");
            console.log(error);
        })
}