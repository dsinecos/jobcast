var pgp = require('pg-promise')();
var connectionString = process.env.DATABASE_URL || "pg://postgres:postgres@localhost:5432/jobcast";
var jobcastDatabaseClient = pgp(connectionString);

module.exports = jobcastDatabaseClient;