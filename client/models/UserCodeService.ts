/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file Service for getting Users code.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';

import { UserCodeSource } from './UserCodeSource';

@Injectable()
export class UserCodeService {
  datasource: UserCodeSource;

  // URL to execute code
  private executorAPIEndpoint = 'http://localhost:3001/api/executor';

  /**
   * Default constructor initializes data source.
   *
   * @constructor
   */
  constructor(private http: Http) {
    this.datasource = new UserCodeSource();
  }

  /**
   * Get the code for given email.
   *
   * @param {string} email  Email to get the code for. Each user has just
   *                        one code.
   *
   * @returns {Code}        Code object.
   */
  getCodeForEmail ( email: string ) {
    return this.datasource.getCodeForEmail( email );
  }

  /**
   * Get the code for given language.
   *
   * @param {string} lang   Language to get the code for. Each lang has just
   *                        one code.
   * @param {string} email  Email of user.
   *
   * @returns {Code}        Code object.
   */
  getCodeForLang ( lang: string, email: string ) {
    return this.datasource.getCodeForLang( lang, email );
  }

  /**
   * Execute the code for given language.
   *
   * @param {string} lang   Language to get the code for. Each lang has just
   *                        one code.
   * @param {string} code   Code to be executed.
   *
   * @returns {Array.string} Output logs
   */
  executeCode (lang: string, code: string): Observable<string[]> {
    let body = JSON.stringify({ language: lang, code: code });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.executorAPIEndpoint, body, options)
      .map( this.extractData )
      .catch( this.handleError );
   }

  /**
   * Map response to json.
   *
   * @param {Response} res             Response received.
   *
   * @returns {any} Response data in a JSON object.
   */
  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  /**
   * An error occurred.
   *
   * @param {any} error           Error information.
   *
   * @returns {Exception} The exception that occurred.
   */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
