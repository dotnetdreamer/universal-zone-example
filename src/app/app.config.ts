import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { dbFactory, DbModule, DbService, DbServiceType, SchemaService } from 'ngx-universal-zone/database';
import { dbConfig } from './app.component';
import { UniversalZoneModule } from 'ngx-universal-zone';


function initializeDb(schemaSvc: SchemaService) {
  return async () => {
    // const platform = await Capacitor.getPlatform();
    dbConfig.dbType = DbServiceType.IndexDd;

    schemaSvc.init(dbConfig);

    // dbFactory(schemaSvc);
  };
}

export function provideDependentModules() {
  return importProvidersFrom([DbModule.forRoot(), UniversalZoneModule.forRoot()]);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
    , provideRouter(routes)
    , {
      provide: APP_INITIALIZER,
      useFactory: initializeDb,
      multi: true,
      deps: [SchemaService]
    }
    , provideDependentModules()
  ]
};
