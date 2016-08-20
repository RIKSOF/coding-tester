/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file Editor component.
 */
import { Component, ElementRef, AfterViewInit,
         OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserCodeService } from '../models/UserCodeService';
import { Code } from '../models/Code';

declare var CodeMirror: any;

@Component({
  templateUrl: 'editor/editor.component.html',
  providers: [UserCodeService]
})

export class ClientEditorComponent implements AfterViewInit, OnInit, OnDestroy {

  private sub: Subscription;
  private language: string;
  private email: string;
  private code: Code;
  private cMirror: any;

  // Show this on the view
  logs: string[];

  /**
   * The client component
   *
   * @constructor
   * @param {UserCodeService}       Service to get user code.
   * @param {ElementRef}            Native element for this component.
   */
  constructor( private service: UserCodeService,
    private elementRef: ElementRef,
    private route: ActivatedRoute ) {
  }

  /**
   * This function is called when the component is being initialized.
   *
   * @returns {undefined}
   */
  ngOnInit() {
    this.sub = this.route.params.subscribe( params => {
      this.email = params['email'];
      this.language = params['lang'];
      this.code = this.service.getCodeForEmail( this.email );

      // If this user does not have code posted, we get the default code.
      if ( this.code === undefined ) {
        this.service.getCodeTemplate( this.language, this.email )
          .subscribe(
            code => {
              this.code = code;
              this.cMirror.doc.setValue( this.code.program );
            },
            error =>  this.code = <any>error);
      }
    });
  }

  /**
   * This function is called after view has been initialized. We can
   * now initialize the console.
   *
   * @returns {undefined}
   */
  ngAfterViewInit() {
    this.cMirror = CodeMirror( this.elementRef.nativeElement, {
      mode:  this.language,
      lineNumbers: true,
      tabSize: 2,
      autofocus: true
    });
  }

  /**
   * Unsubscribe from paramters.
   *
   * @returns {undefined}
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * Executes the current code.
   *
   * @returns {undefined} None
   */
  execute() {
    this.service.executeCode( 'JavaScript', this.cMirror.doc.getValue() )
      .subscribe( logs => this.logs = logs,
                  error => this.logs = [<any>error]);
  }

  submit() {

  }
}
