var jobcastDatabaseClient = require('../../db/index.js');

module.exports = function (req, res, next) {

    
    var companyName = req.body.companyName;
    var companyDescription = req.body.companyDescription;
    var jobTitle = req.body.jobTitle;
    var jobDescription = req.body.jobDescription;
    var jobProfileID = req.params.id;

    // var SQLQuery = `INSERT INTO jobcast_jobprofile (companyname, companydescription, jobtitle, jobdescription) VALUES ($1, $2, $3, $4)`;
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