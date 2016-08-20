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
  template: '',
  providers: [UserCodeService]
})

export class ClientEditorComponent implements AfterViewInit, OnInit, OnDestroy {

  private sub: Subscription;
  private language: string;
  private email: string;
  private code: Code;
  private cMirror: any;

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
        this.code = this.service.getCodeForLang( this.language, this.email );
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
      value: this.code.program,
      mode:  this.code.getProgrammingLangauge(),
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
}
