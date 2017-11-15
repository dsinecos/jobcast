var express = require('express');
var router = express.Router();

var isAuthenticated = require('../user/isAuthenticated.js')

var addJobprofile = require('./addJobprofile.js');
var editJobprofile = require('./editJobprofile.js');
var deleteJobprofile = require('./deleteJobprofile.js');
var getJobprofile = require('./getJobprofile.js');
var getAllJobprofile = require('./getAllJobprofile.js');

var validateJobProfileData = require('./validateJobProfileData');

router.post('/', validateJobProfileData, isAuthenticated, addJobprofile);
router.post('/edit/:id', validateJobProfileData, isAuthenticated, editJobprofile);
router.get('/delete/:id', isAuthenticated, deleteJobprofile);
router.get('/getJobProfile/:id', isAuthenticated, getJobprofile);
router.get('/getAll', isAuthenticated, getAllJobprofile);

module.exports = router;
