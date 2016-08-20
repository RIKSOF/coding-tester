/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file Client editor module.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClientEditorComponent }  from './editor.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ ClientEditorComponent ],
  bootstrap:    [ ClientEditorComponent ],
  exports:      [ ClientEditorComponent ]
})
export class ClientEditorModule {
}
