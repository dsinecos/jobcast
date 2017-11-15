var jobcastDatabaseClient = require('./index.js');

var pgp = require('pg-promise')();

var connectionString = process.env.DATABASE_URL || "pg://postgres:postgres@localhost:5432/jobcast";
var jobcastDatabaseClient = pgp(connectionString);

var queryToDropJobProfileTable = "DROP TABLE IF EXISTS jobcast_jobprofile";
var queryToDropUserTable = "DROP TABLE IF EXISTS jobcast_users";
var queryToDropUserJobprofileTable = "DROP TABLE IF EXISTS jobcast_userjobprofile";

var queryToGenerateJobProfileTable = "CREATE TABLE IF NOT EXISTS jobcast_jobprofile(jobprofile_id SERIAL PRIMARY KEY, companyname varchar(256) NOT NULL, companydescription varchar(256) NOT NULL, jobtitle varchar(256) NOT NULL, jobdescription varchar(256) NOT NULL)";
var queryToGenerateUserTable = "CREATE TABLE IF NOT EXISTS jobcast_users(user_id SERIAL PRIMARY KEY, username varchar(256) NOT NULL, password varchar(256) NOT NULL, isadmin BOOLEAN NOT NULL)";
var queryToGenerateUserJobprofileTable = "CREATE TABLE IF NOT EXISTS jobcast_userjobprofile(user_id int, FOREIGN KEY (user_id) REFERENCES jobcast_users(user_id), jobprofile_id int, FOREIGN KEY (jobprofile_id) REFERENCES jobcast_jobprofile(jobprofile_id))";

jobcastDatabaseClient.query(queryToDropJobProfileTable)
    .then(function (data) {

        jobcastDatabaseClient.query(queryToDropUserTable)
            .then(function (data) {

                jobcastDatabaseClient.query(queryToDropUserJobprofileTable)
                    .then(function (data) {

                        var jobprofileTable = jobcastDatabaseClient.query(queryToGenerateJobProfileTable)
                            .then(function (data) {
                                console.log("Job Profile table generated");
                            })
                            .catch(function (error) {
                                console.log("Error generating job profile table");
                                console.log(error);
                            })

                        var userTable = jobcastDatabaseClient.query(queryToGenerateUserTable)
                            .then(function (data) {
                                console.log("User table generated");
                            })
                            .catch(function (error) {
                                console.log("Error generating user table");
                                console.log(error);
                            })

                        var queryArray = [jobprofileTable, userTable];

                        Promise.all(queryArray)
                            .then(function (data) {

                                jobcastDatabaseClient.query(queryToGenerateUserJobprofileTable)
                                    .then(function (data) {
                                        console.log("UserJobprofile table generated");
                                    })
                                    .catch(function (error) {
                                        console.log("Error generating UserJobprofile table");
                                        console.log(error);
                                    })

                            })
                            .catch(function (error) {
                                console.log("Error in Promise.all(queryArray)");
                                console.log(error);
                            })

                    })
                    .catch(function (error) {
                        console.log("Error dropping UserJobprofile Table");
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
