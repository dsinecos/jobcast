var express = require('express');
var router = express.Router();

var addJobprofile = require('./addJobprofile.js');
var editJobprofile = require('./editJobprofile.js');
var deleteJobprofile = require('./deleteJobprofile.js');
var getJobprofile = require('./getJobprofile.js');
var getAllJobprofile = require('./getAllJobprofile.js');

router.post('/', addJobprofile);
router.post('/edit/:id', editJobprofile);
router.get('/delete/:id', deleteJobprofile);
router.get('/getJobProfile/:id', getJobprofile);
router.get('/getAll', getAllJobprofile);

router.get('/', function(req, res, next) {
    res.send("Hoila");
    console.log("Jamoila");
});

module.exports = router;
