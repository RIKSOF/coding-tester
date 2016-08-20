'use strict';

/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file Module for the API service.
 */

/**
 * Constructor
 *
 * @constructor
 * @class [Service Object]
 */
var ServiceConstructor = function Service( ) {
  // The app
  var express = require( 'express' );
  this.app = express();

  // Add the middleware.
  // Application JSON
  var bodyParser = require('body-parser');
  this.app.use( bodyParser.json() );

  // Support for cross domain.
  this.app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  // The server is not started yet.
  this.httpServer = null;

  // The service that is used to stop the server.
  this.service = null;
};

/**
 * Starts the service with given parameters.
 *
 * @param {ServiceConfiguration} params           Params for the service.
 *
 * @returns {undefined}
 */
ServiceConstructor.prototype.start = function ServiceStart( params ) {
  // Start the http server
  this.httpServer = require('http').createServer( this.app );

  // Make the server listen
  this.service = this.httpServer.listen( params.http.port );
}

/**
 * Stop the service
 *
 * @returns {undefined}
 */
ServiceConstructor.prototype.stop = function ServiceStop( ) {
  this.service.close();
  this.service = null;
}

// Make the module available to all
module.exports = ServiceConstructor;
