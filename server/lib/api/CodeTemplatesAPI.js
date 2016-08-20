'use strict';

/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file API for getting code Templates.
 */

/**
 * Constructor
 *
 * @constructor
 * @class [CodeTemplatesAPI API]
 */
var CodeTemplatesAPIConstructor = function CodeTemplatesAPI() {
};

/**
 * Sets the app to respond to this API.
 *
 * @param {Express} app           Server app to which we need to hook the API.
 * @param {Config} params         Configuration parameters.
 *
 * @returns {undefined} None
 */
CodeTemplatesAPIConstructor.prototype.setup = function CodeTemplatesAPISetup( app, params ) {
  var me = this;
  app.get( params.http.base + 'templates', function CodeTemplatesAPIExec( req, res ) {
    // Get the code promise.
    var p = me.get( params.code.dir + req.query.language + params.code.ext );

    // Execute on the promise.
    p.done( function CodeTemplatesAPICodeRead( str ) {
      var json = {
        code: str
      };

      res.jsonp( json );
    });
  });
}

/**
 * The actual GET API method.
 *
 * @param {string} file   File for language to be pulled.
 *
 * @returns {string} Program code.
 */
CodeTemplatesAPIConstructor.prototype.get = function CodeTemplatesAPIGet( file ) {
  var Promise = require('promise');
  var fs = require('fs');

  // Return a promise for file reading.
  var read = Promise.denodeify( fs.readFile );

  // Return contents of the read file.
  return read( file, 'utf8');
}

// Make the module available to all
module.exports = CodeTemplatesAPIConstructor;
