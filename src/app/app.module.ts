import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import {
  NgxPropsApiModule,
  NgxServiceInterceptorProviders,
} from 'ngx-api-sdk';
import { LineSys } from './model/routes/line-sys.route';
import { ErrorInterceptor, JwtInterceptor } from './auth/helpers';
import { SharedModule } from './main/shared/shared.module';

const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./main/pages/@profile-and-setting/profile-setting.module').then(m => m.ProfileSettingModule)
  },
  {
    path: '',
    redirectTo: `${LineSys.lines.line_home}`,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: `${LineSys.path.path_error}`
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    SampleModule,

    // Shared modules
    SharedModule,

    // API Sdk modules
    NgxPropsApiModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    NgxServiceInterceptorProviders,// API Sdk
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
