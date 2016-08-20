/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file Client bootstrap.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ClientAppModule } from './app.module';
import {enableProdMode} from '@angular/core';
// TODO: Enable when going to production enableProdMode();

platformBrowserDynamic().bootstrapModule(ClientAppModule);
