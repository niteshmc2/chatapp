let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser'),
    socketEvents = require('./socket-events');


// mongoose instance connection url connection
mongoose.connect('mongodb://admin:admin@ds123399.mlab.com:23399/messenger', {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//use cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

//Initialize app
let initApp = require('./api/app');
initApp(app);

let server = app.listen(port);
console.log('Flow server started on: ' + port);


const socketio = require('socket.io').listen(server);
let io = require('./socket-events');
io(socketio);
