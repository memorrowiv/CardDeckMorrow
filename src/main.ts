import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component'; //

platformBrowserDynamic()
  .bootstrapModule(AppComponent) // B
  .catch(err => console.error(err)); // Catch any errors during bootstrapping
