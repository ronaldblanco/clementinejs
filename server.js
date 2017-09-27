'use strict';

var routes = require('./app/routes/index.js');
var app = require('./express.js');

var mongoose = require('mongoose');
var passport = require('passport');
var passportTwitter = require('passport');
var passportLocal = require('passport');

var winston = require('winston');
require('winston-daily-rotate-file');
var functions = require('./app/common/functions.js');

require('dotenv').load();
require('./app/config/passport')(passport);
require('./app/config/passport-twitter')(passportTwitter);
require('./app/config/passport-local')(passportLocal);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

/////EMAIL CONFIG////////////////////////////////////////////////////////////////////////////
var emailServer = {
    'user' : process.env.EMAILUSER,
    'password' : process.env.EMAILPASS,
    'host' : process.env.EMAILHOST,
    'port' : process.env.EMAILPORT
};
////////////////////////////////////////////////////////////////////////////////////

//CHECK FOLDER LOG AND CREATE IT////////////////////////////////////
functions.ensureExists(__dirname + '/log', '0744', function(err) {
    if (err) console.error(err);
    else console.log('Folder Log was created or existed');
});
//////////////////////////////////////////////////

//LOGGER//////////////////////////////////////////
var logger = new (winston.Logger)({
    transports: [
      functions.transport
    ]
  });
functions.logIt(logger,'//////////////////STARTING LOGGER INFO////////////////////////');
/////////////////////////////////////////////////

routes(app, passport, passportTwitter, passportLocal, emailServer);

//PORT config
var port = process.env.PORT || 8080;

if (process.env.SOCKET === 'TRUE'){
    //Uncomment to used the Websocket Controller
    //using: socket.io http and model config.js as test
    //WEBSOCKET///////////////////////////
    var server = require('http').createServer(app);
    var io = require('socket.io')(server);
    var webSocketHandler = require(process.cwd() + '/app/controllers/webSocketHandler.server.js');

    var endpoint = io
        .of('/')
        .on('connection', function (socket) {
            webSocketHandler.respond(endpoint,socket,true);
    });

    server.listen(port,  function () {
	    console.log('Node.js with WebSocket listening on port ' + port + '...');
    });
    //WEBSOCKET//////////////////////////
    
} else if (process.env.SOCKET === 'FALSE' || process.env.SOCKET === undefined || process.env.SOCKET === null){
    app.listen(port,  function () {
	    console.log('Node.js listening on port ' + port + '...');
    });
}


