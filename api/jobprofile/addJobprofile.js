var jobcastDatabaseClient = require('../../db/index.js');

module.exports = function (req, res, next) {

    var companyName = req.body.companyName;
    var companyDescription = req.body.companyDescription;
    var jobTitle = req.body.jobTitle;
    var jobDescription = req.body.jobDescription;

    var SQLQuery = `INSERT INTO jobcast_jobprofile (companyname, companydescription, jobtitle, jobdescription) VALUES ($1, $2, $3, $4)`;

    jobcastDatabaseClient.query(SQLQuery, [companyName, companyDescription, jobTitle, jobDescription])
        .then(function (data) {
            console.log("Data inserted into job profile");
            res.send("Hoila Jamoila, Jobprofile inserted into database");
        })
        .catch(function (error) {
            console.log("Error inserting job profile");
            console.log("Error");
        })

}