
'use strict'



const port  = "1414";
const path  = require('path');
const http  = require('http');
// const fs    = require('fs');
// const qs    = require('querystring');
// const debug = require('debug')('planner:server');
const logger = require('morgan');
const express = require('express');
const route = require('./routes/routes.js')
const app = express();


function appSetup() {
    app.use(logger('dev'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', route)
}



function serverController(hostname) {
    const server = http.createServer(app);
    
    server.listen(port, hostname, () => {
        console.log(`Server running at ${hostname}:${port}\n`);
    });
};



(function launch() {
        if (process.argv.length > 2) {
            var hostname = process.argv[2];
		} else {
			var hostname = "127.0.0.1";
        };
        appSetup()
		serverController(hostname);
})();
