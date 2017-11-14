var pgp = require('pg-promise')();

var localDatabaseURL = "pg://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_DBNAME;

var connectionString = process.env.DATABASE_URL || localDatabaseURL;
var jobcastDatabaseClient = pgp(connectionString);

module.exports = jobcastDatabaseClient;