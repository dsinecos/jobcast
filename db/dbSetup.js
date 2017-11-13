var jobcastDatabaseClient = require('./index.js');

var queryToDropJobProfileTable = "DROP TABLE IF EXISTS jobcast_jobprofile";
var queryToGenerateJobProfileTable = "CREATE TABLE IF NOT EXISTS jobcast_jobprofile(jobprofile_id SERIAL PRIMARY KEY, companyname varchar(256) NOT NULL, companydescription varchar(256) NOT NULL, jobtitle varchar(256) NOT NULL, jobdescription varchar(256) NOT NULL)";

jobcastDatabaseClient.query(queryToDropJobProfileTable)
    .then(function (data) {

        jobcastDatabaseClient.query(queryToGenerateJobProfileTable)
            .then(function (data) {
                console.log("Job Profile table generated");
            })
            .catch(function (error) {
                console.log("Error generating job profile table");
                console.log(error);
            })

    })
    .catch(function (error) {

        console.log("Error dropping job profile table");
        console.log(error);

    })
