/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file Client app component.
 */
import {Component} from '@angular/core';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

@Component({
  selector: 'client-app',
  templateUrl: 'app/app.component.html'
})

export class ClientAppComponent {
  /**
   * The client component
   *
   * @constructor
   */
  constructor() {
  }
}
