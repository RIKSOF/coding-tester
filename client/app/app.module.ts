/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file Client module.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { routing,
         appRoutingProviders } from './app.routing';
import { ClientAppComponent }  from './app.component';
import { ClientEditorModule } from '../editor/editor.module';

@NgModule({
  imports:      [ BrowserModule,
                  HttpModule,
                  JsonpModule,
                  routing,
                  ClientEditorModule ],
  declarations: [ ClientAppComponent ],
  bootstrap:    [ ClientAppComponent ],
  providers:    [ appRoutingProviders ]
})
export class ClientAppModule {
}
