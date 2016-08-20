/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file Service for getting Users code.
 */
import { ProgrammingLanguage, Code } from './Code';

// The code user has already posted.
var CodeDataForUser: {
  [email: string]: Code;
} = {
  'khurram.ali@riksof.com': new Code( 'khurram.ali@riksof.com',
    'function myScript() {\n    return 100;\n}\n',
    ProgrammingLanguage.JavaScript )
};

// The code for a given language.
var CodeDataForLanguage: {
  [lang: string]: { lang: ProgrammingLanguage, program: string };
} = {
  'javascript': {
    lang: ProgrammingLanguage.JavaScript,
    program: 'function myScript() {\n    return 101;\n}; myScript();\n'
  }
};

export class UserCodeSource {
  /**
   * Get the code for given email.
   *
   * @param {string} email Email to get the code for. Each user has just
   *                        one code.
   *
   * @returns {Code}        Code object.
   */
  getCodeForEmail ( email: string ) {
    return CodeDataForUser[ email ];
  }

  /**
   * Post code for given email.
   *
   * @param {string} email              Email to set the code for. Each user has
   *                                    just one code.
   * @param {string} prog               The program posted.
   * @param {ProgrammingLanguage}lang   Language used.
   *
   * @returns {undefined}
   */
  postCodeForEmail( email: string, prog: string, lang: ProgrammingLanguage ) {
    CodeDataForUser[ email ] = new Code( email, prog, lang );
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
    var c = CodeDataForLanguage[ lang ];
    return new Code( email, c.program, c.lang );
  }
}
