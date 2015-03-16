// Based on the tutorial:
// http://tutorialzine.com/2012/08/nodejs-drawing-game/

//Restrictions on HEROKU:
// Doesn't support installing dependencies with npm with node 0.8
// Doesn't support websocekts.

// Including libraries

var nstatic = require('node-static');
var fileServer = new(nstatic.Server)('./');
var http = require('http');

var app = http.createServer(function (request, response) {
    request.resume();
    request.addListener('end', function () {
        fileServer.serve(request, response);
    });
});

var io = require('socket.io')(app);

app.listen(process.env.PORT || 80);

// Listen for incoming connections from clients
io.on('connection', function (socket) {

	// Start listening for mouse move events
	socket.on('mousemove', function (data) {
		
		// This line sends the event (broadcasts it)
		// to everyone except the originating client.
		socket.broadcast.emit('moving', data);
	});
});