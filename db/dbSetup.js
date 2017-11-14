var jobcastDatabaseClient = require('./index.js');

var queryToDropJobProfileTable = "DROP TABLE IF EXISTS jobcast_jobprofile";
var queryToDropUserTable = "DROP TABLE IF EXISTS jobcast_users";
var queryToGenerateJobProfileTable = "CREATE TABLE IF NOT EXISTS jobcast_jobprofile(jobprofile_id SERIAL PRIMARY KEY, companyname varchar(256) NOT NULL, companydescription varchar(256) NOT NULL, jobtitle varchar(256) NOT NULL, jobdescription varchar(256) NOT NULL)";
var queryToGenerateUserTable = "CREATE TABLE IF NOT EXISTS jobcast_users(user_id SERIAL PRIMARY KEY, username varchar(256) NOT NULL, password varchar(256) NOT NULL, isadmin BOOLEAN NOT NULL)";

jobcastDatabaseClient.query(queryToDropJobProfileTable)
    .then(function (data) {

        jobcastDatabaseClient.query(queryToDropUserTable)
            .then(function (data) {

                jobcastDatabaseClient.query(queryToGenerateJobProfileTable)
                    .then(function (data) {
                        console.log("Job Profile table generated");
                    })
                    .catch(function (error) {
                        console.log("Error generating job profile table");
                        console.log(error);
                    })

                jobcastDatabaseClient.query(queryToGenerateUserTable)
                    .then(function (data) {
                        console.log("User table generated");
                    })
                    .catch(function (error) {
                        console.log("Error generating user table");
                        console.log(error);
                    })

            })
            .catch(function (error) {
                console.log("Eror dropping user table");
                console.log(error);
            })



    })
    .catch(function (error) {

        console.log("Error dropping job profile table");
        console.log(error);

    })
