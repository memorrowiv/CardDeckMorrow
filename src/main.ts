import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component'; // Import standalone AppComponent

platformBrowserDynamic()
  .bootstrapComponent(AppComponent)
  .catch((err) => console.error(err));
