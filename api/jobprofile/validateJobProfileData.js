var joi = require('joi');

module.exports = function jobProfileDataValidation(req, res, next) {

    const schema = joi.object().keys({
        companyName: joi.string().required().min(2),
        companyDescription: joi.string().required().min(10),
        jobTitle: joi.string().required().min(5),
        jobDescription: joi.string().required().min(10)
    });

    var validateJobProfileData = new Promise(function (resolve, reject) {

        var result = joi.validate({ companyName: req.body.companyName, companyDescription: req.body.companyDescription, jobTitle: req.body.jobTitle, jobDescription: req.body.jobDescription }, schema);

        if (result.error === null) {
            resolve(result);
        } else {
            reject(result.error);
        }

    });

    validateJobProfileData
        .then(function (data) {
            console.log("Job profile data validated");
            next();
        })
        .catch(function (error) {
            console.log("Job profile data invalidated");
            next(error);
        })

}
