import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule} from "@angular/material/slide-toggle";
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatSidenavModule} from "@angular/material/sidenav";
import { MatButtonModule} from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule} from "@angular/flex-layout";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FullYearComponent } from './pages/full-year/full-year.component';
import { LastMonthComponent } from './pages/last-month/last-month.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FullYearComponent,
    LastMonthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
