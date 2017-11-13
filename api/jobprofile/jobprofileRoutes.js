var express = require('express');
var router = express.Router();

var addJobprofile = require('./addJobprofile.js');
var editJobprofile = require('./editJobprofile.js');
var deleteJobprofile = require('./deleteJobprofile.js');
var getJobprofile = require('./getJobprofile.js');
var getAllJobprofile = require('./getAllJobprofile.js');

var validateJobProfileData = require('./validateJobProfileData');

router.post('/', validateJobProfileData, addJobprofile);
router.post('/edit/:id', validateJobProfileData, editJobprofile);
router.get('/delete/:id', deleteJobprofile);
router.get('/getJobProfile/:id', getJobprofile);
router.get('/getAll', getAllJobprofile);

module.exports = router;
