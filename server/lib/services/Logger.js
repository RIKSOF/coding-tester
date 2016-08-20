'use strict';

/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file Module for executing javascript that is passed.
 */
// Dependencies
var winston = require( 'winston' );

// Setup the logger
var Logger = {
  // The logging object.
  l: null,

  /**
   * Setup the logger.
   *
   * @param {Config} params         Configuration parameters to use.
   *
   * @returns {undefined}
   */
  setup: function LoggerSetup( params ) {
    Logger.l = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)(),
    	  new (winston.transports.File)({
          name: 'file#error',
          filename: params.logger.dir + params.logger.errorFile,
          level: 'error',
          maxsize: params.logger.maxFileSize,
          maxFiles: params.logger.maxFiles
        }),
    	  new (winston.transports.File)({
          name: 'file#all',
          filename: params.logger.dir + params.logger.consoleFile,
          maxsize: params.logger.maxFileSize,
          maxFiles: params.logger.maxFiles
        })
      ]
    });

    // Setup the directory.
    var fs = require('fs');

    if ( !fs.existsSync( params.logger.dir ) ){
      fs.mkdirSync( params.logger.dir );
    }
  }
}

// Make the logger available to all
module.exports = Logger;
