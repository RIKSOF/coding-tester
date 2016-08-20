/**
 * @author Copyright RIKSOF (Private) Limited 2016.
 *
 * @file Client app routing.
 */
import { Routes, RouterModule } from '@angular/router';
import { ClientEditorComponent }  from '../editor/editor.component';

// Routes for this client.
const appRoutes: Routes = [
  {
    path: 'console-editor/:lang/:email', component: ClientEditorComponent
  }
];

// Providers for the routes.
export const appRoutingProviders: any[] = [
];

// Setup the routing
export const routing = RouterModule.forRoot(appRoutes);
