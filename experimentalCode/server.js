var fs = require('fs');
var express = require('express');
var https = require('https');
var key = fs.readFileSync('./key.pem');
var cert = fs.readFileSync('./cert.pem')
var https_options = {
    key: key,
    cert: cert,
    passphrase: 'test'
};
var PORT = 8000;
var HOST = 'localhost';
app = express();

// app.configure(function () {
//     app.use(app.router);
// });

// How to redirect traffic from HTTP to HTTPS?

var express_enforces_ssl = require('express-enforces-ssl');
app.enable('trust proxy');
app.use(express_enforces_ssl());

// var helmet = require('helmet');
// var ms = require('ms');

// app.use(helmet.hsts({
//     maxAge: ms('1 year'),
//     includeSubdomains: true
// }))

server = https.createServer(https_options, app).listen(PORT, HOST);
console.log('HTTPS Server listening on %s:%s', HOST, PORT);

// var http = require('http');
// http.createServer(app).listen(8000);

// app.use(function (req, res, next) {
//     if (req.secure) {
//         next();
//     } else {
//         res.redirect('https://' + req.headers.host + req.url);
//     }
// });

// function requireHTTPS(req, res, next) {

//     console.log(req);

//     console.log("Inside requireHTTPS");

//     if (!req.secure) {
//         //FYI this should work for local development as well
//         console.log("Inside if");
//         console.log("Is the connection secure : " + req.secure);


//         return res.redirect('https://' + req.get('host') + req.url);
//     }
//     console.log("Is the connection secure : " + req.secure);
//     next();
// }

// app.use(requireHTTPS);

// routes
app.get('/', function (req, res) {
    res.send('HEY!');
});
app.get('/ho', function (req, res) {
    res.send('HO!');
});