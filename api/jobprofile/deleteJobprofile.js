var jobcastDatabaseClient = require('../../db/index.js');

module.exports = function (req, res, next) {

    var jobProfileID = req.params.id;
    var user_id = req.user_id;

    jobcastDatabaseClient.tx(function (dbConnection) {

        return dbConnection.none('DELETE FROM jobcast_userjobprofile WHERE user_id = $1 AND jobprofile_id = $2', [user_id, jobProfileID])
            .then(function (data) {

                console.log("Data from table linking user and jobprofile deleted");

                return dbConnection.none('DELETE FROM jobcast_jobprofile WHERE jobprofile_id = $1', [jobProfileID]);
            })
    })
        .then(function (data) {
            console.log("Data deleted successfully using Transaction");
            res.send("Data deleted successfully using transaction");
        })
        .catch(function (error) {
            console.log("Error while executing transaction - deleting jobprofile");
            console.log(error);
        })


    // var SQLQuery = `DELETE FROM jobcast_jobprofile WHERE jobprofile_id = $1`;

    // jobcastDatabaseClient.query(SQLQuery, [jobProfileID])
    //     .then(function (data) {
    //         console.log("Data deleted in the job profile table");
    //         res.send("Hoila Jamoila, Jobprofile deleted inside database");
    //     })
    //     .catch(function (error) {
    //         console.log("Error deleting job profile");
    //         console.log(error);
    //     })
}