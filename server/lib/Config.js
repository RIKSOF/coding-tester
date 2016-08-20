'use strict';

/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file Module for Configurations.
 */

/**
 * Constructor
 *
 * @constructor
 * @class [Config Object]
 */
var ConfigConstructor = function Config() {
  // Logger properties.
  this.logger = {
    dir: __dirname + '/../logs/',
    errorFile: 'error.log',
    consoleFile: 'console.log',
    maxFileSize: 1000000,
    maxFiles: 1
  }

  // HTTP
  this.http = {
    port: 3001,
    enableSSL: false,
    base: '/api/'
  }
};

/**
 * Sets the default configurations.
 *
 * @params {Config} params          The configurations to override.
 *
 * @returns {undefined}
 */
ConfigConstructor.prototype.defaults = function ConfigDefaults( params ) {
  var _ = require('lodash');
  _.merge( this, params );
};

// Make the module available to all
module.exports = ConfigConstructor;
