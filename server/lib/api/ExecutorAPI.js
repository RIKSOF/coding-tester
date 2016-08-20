'use strict';

/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file API for executing code.
 */

/**
 * Constructor
 *
 * @constructor
 * @param {Executors} executors   Executors module
 * @class [ExecutorAPI API]
 */
var ExecutorAPIConstructor = function ExecutorAPI( executors ) {
  this.executors = executors;
};

/**
 * Sets the app to respond to executor API.
 *
 * @param {Express} app           Server app to which we need to hook the API.
 * @param {Config} params         Configuration parameters.
 *
 * @returns {undefined} None
 */
ExecutorAPIConstructor.prototype.setup = function ExecutorAPISetup( app, params ) {
  var me = this;
  app.post( params.http.base + 'executor', function ExecutorAPIExec( req, res ) {
    var logs = me.api( req.body.code, req.body.language );
    res.jsonp( logs );
  });
}

/**
 * The actual API method.
 *
 * @param {string} code       Code to be executed.
 * @param {string} language   Language selected.
 *
 * @returns {string} Program output.
 */
ExecutorAPIConstructor.prototype.api = function ExecutorAPICommand( code, language ) {
  var tool = new this.executors[ language ]();
  var logs = tool.exec( code );

  return logs;
}

// Make the module available to all
module.exports = ExecutorAPIConstructor;
