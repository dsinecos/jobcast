var jobcastDatabaseClient = require('../../db/index.js');

module.exports = function (req, res, next) {

    var companyName = req.body.companyName;
    var companyDescription = req.body.companyDescription;
    var jobTitle = req.body.jobTitle;
    var jobDescription = req.body.jobDescription;

    var user_id = req.user_id;

    console.log("/n");
    console.log("--------------------------------------------------------------");
    console.log("User id extracted : " + user_id);

    jobcastDatabaseClient.tx(function (dbConnection) {

        return dbConnection.one('INSERT INTO jobcast_jobprofile (companyname, companydescription, jobtitle, jobdescription) VALUES ($1, $2, $3, $4) RETURNING jobprofile_id', [companyName, companyDescription, jobTitle, jobDescription])
            .then(function (jobprofile) {

                console.log("This is the jobprofile");
                console.log(JSON.stringify(jobprofile, null, "  "));

                var jobprofile_id = jobprofile.jobprofile_id;

                return dbConnection.none('INSERT INTO jobcast_userjobprofile (user_id, jobprofile_id) VALUES ($1, $2)', [user_id, jobprofile_id]);
            })
    })
    .then(function(data) {
        console.log("Data inserted successfully using Transaction");
        res.send("Data inserted successfully using Transaction")
    })
    .catch(function(error) {
        console.log("Error while executing transaction");
        console.log(error);
    })

    // var SQLQuery = `INSERT INTO jobcast_jobprofile (companyname, companydescription, jobtitle, jobdescription) VALUES ($1, $2, $3, $4) RETURNING jobprofile_id`;

    // jobcastDatabaseClient.query(SQLQuery, [companyName, companyDescription, jobTitle, jobDescription])
    //     .then(function (data) {
    //         console.log("Data inserted into job profile");
    //         console.log("Is this the jobprofile_id " + JSON.stringify(data, null, "  "));
    //         console.log(" : " + data[0].jobprofile_id);

    //         var jobprofile_id = data[0].jobprofile_id;

    //         res.send("Hoila Jamoila, Jobprofile inserted into database");

    //         var SQLQuery = `INSERT INTO jobcast_userjobprofile (user_id, jobprofile_id) VALUES ($1, $2)`;

    //         jobcastDatabaseClient.query(SQLQuery, [user_id, jobprofile_id])
    //             .then(function (data) {
    //                 console.log("UserJobprofile table updated");
    //                 console.log(data);
    //             })
    //             .catch(function (error) {
    //                 console.log("Error inserting into userjobprofile table");
    //                 console.log(error);
    //             })
    //     })
    //     .catch(function (error) {
    //         console.log("Error inserting job profile");
    //         console.log("Error");
    //     })

}