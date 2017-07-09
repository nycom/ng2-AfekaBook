import { bootstrap }    from '@angular/platform-browser-dynamic';
import { Location, LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS,{provide: LocationStrategy, useClass: HashLocationStrategy}
    //disableDeprecatedForms(), // disable deprecated forms
    //provideForms(), // enable new forms module

]);

