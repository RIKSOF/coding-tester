'use strict';

/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file Module for executing javascript that is passed.
 */

/**
 * Constructor
 *
 * @constructor
 * @class [JavaScriptExecutor Executor]
 */
var JavaScriptExecutorConstructor = function JavaScriptExecutor( ) {
};

/**
 * Change the write stream. to log output to given array.
 *
 * @param {Array} logs        Array to log output to.
 *
 * @returns {function}        Returns a function that can be used to revert
 *                            to original stream.
 */
JavaScriptExecutorConstructor.prototype.hookToWriteStream = function JavaScriptExecutorHookToWriteStream( logs ) {
  // Remember the old write method
  process.stdout.old_write = process.stdout.write;

  // Update the write method:
  process.stdout.write = function logAndWrite( string, encoding, fd ) {
    logs.push(string);
    process.stdout.old_write( string, encoding, fd );
  }

  // Returns the function to unhook
  return function revertWriteStream() {
      // reset to the default write method
      process.stdout.write = process.stdout.old_write;
      delete process.stdout.old_write;
  };
}

/**
 * Execute the given code.
 *
 * @param {string} code       Code to be executed.
 *
 * @returns {string}          Program output.
 */
JavaScriptExecutorConstructor.prototype.exec = function JavaScriptExecutorExec( code ) {
  // Output array.
  var logs = [];

  // Hook write stream.
  var unhookFromStream = this.hookToWriteStream( logs );

  // Need to catch all prgramming errors.
  try {
    eval( code );
  } catch ( e ) {
    console.log(e.stack);
  }

  // Back to being normal.
  unhookFromStream();

  return logs;
}

// Make the module available to all
module.exports = JavaScriptExecutorConstructor;
