/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file Model to keep the code.
 */

export enum ProgrammingLanguage {
  JavaScript,
  Java,
  ObjectiveC,
  Swift,
  PHP,
  Python
};

export class Code {
  email: string;
  program: string;
  language: ProgrammingLanguage;

  /**
   * New instance with these values.
   *
   * @constructor
   * @param {string} email                      Email of user.
   * @param {string} program                    Program posted.
   * @param {ProgrammingLanguage} language      Language written in.
   */
  constructor( email: string, program: string, language: ProgrammingLanguage ) {
    this.email = email;
    this.program = program;
    this.language = language;
  }

  /**
   * Get the programming language name.
   *
   * @returns {string}            Name of the language.
   */
  getProgrammingLangauge() {
    var lang: string;
    switch( this.language ) {
      case ProgrammingLanguage.JavaScript:
        lang = 'javascript';
        break;
      case ProgrammingLanguage.Java:
        lang = 'java';
        break;
      case ProgrammingLanguage.ObjectiveC:
        lang = 'objectivec';
        break;
      case ProgrammingLanguage.Swift:
        lang = 'swift';
        break;
      case ProgrammingLanguage.PHP:
        lang = 'php';
        break;
      case ProgrammingLanguage.Python:
        lang = 'python';
        break;
    }

    return lang;
  }
}
