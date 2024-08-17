import { Component, Inject, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSettingService, UniversalZoneModule } from 'ngx-universal-zone';

import { DbModule, DbService, DbServiceConfig, DbServiceType, DbSettingConfig, DbSettingConstant, ITableOptions, SchemaService } from 'ngx-universal-zone/database';


export class DbConstant {
  public static readonly SETTING = DbSettingConstant.SETTING;
  public static readonly CUSTOMER = 'customer';
}

export const dbConfig: DbServiceConfig = {
  dbType: DbServiceType.IndexDd,
  dbName: 'universal-zone-example',
  schema: <ITableOptions[]>[
    { ...DbSettingConfig.schema },  //must needed in order to crate 'setting' table
    {
      name: DbConstant.CUSTOMER,
      columns: [
        {
          name: 'email',
          isPrimaryKey: true,
          type: 'TEXT',
        },
        {
          name: 'name',
          type: 'TEXT',
        }
      ],
    },
  ],
}



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'universal-zone-example';

  constructor(private mySettingsSvc: MySettingsService, private dbSvc: DbService) {
    this.dbSvc.dbInitialized$.subscribe(async () => {
      console.log('db init');
      //Your app should start from here

      await this.mySettingsSvc.putTest();
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class MySettingsService extends AppSettingService {
  constructor(private dbSvc: DbService, private schemaSvc: SchemaService) {
    super(dbSvc, schemaSvc);
  }

  putTest() {
    return this.put('test', 'test value');
  }
}