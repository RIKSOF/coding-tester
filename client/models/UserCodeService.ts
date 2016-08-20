/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file Service for getting Users code.
 */
import { Injectable } from '@angular/core';
import { UserCodeSource } from './UserCodeSource';

@Injectable()
export class UserCodeService {
  datasource: UserCodeSource;

  /**
   * Default constructor initializes data source.
   *
   * @constructor
   */
  constructor() {
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
}
