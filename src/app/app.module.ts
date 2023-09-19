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
import { LoginComponent } from './pages/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {AccountService} from "./services/account.service";
import {HttpClientModule} from "@angular/common/http";
import { MyCategoriesComponent } from './pages/my-categories/my-categories.component';
import { CategorieCardComponent } from './Component/categorie-card/categorie-card.component';
import { SousCategorieCardComponent } from './Component/sous-categorie-card/sous-categorie-card.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FullYearComponent,
    LastMonthComponent,
    LoginComponent,
    MyCategoriesComponent,
    CategorieCardComponent,
    SousCategorieCardComponent,
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
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    CommonModule,
    HttpClientModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
