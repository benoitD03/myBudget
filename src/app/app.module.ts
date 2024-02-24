import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Location } from '@angular/common'
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
import { LoginComponent } from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {CommonModule, DatePipe} from "@angular/common";
import {AccountService} from "./services/account.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MyCategoriesComponent } from './pages/my-categories/my-categories.component';
import { CategorieCardComponent } from './Component/categorie-card/categorie-card.component';
import { SousCategorieCardComponent } from './Component/sous-categorie-card/sous-categorie-card.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";
import { DialogCreateCategorieComponent } from './Component/dialog-create-categorie/dialog-create-categorie.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import { DialogCreateSousCategorieComponent } from './Component/dialog-create-sous-categorie/dialog-create-sous-categorie.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {
  MAT_COLOR_FORMATS,
  NGX_MAT_COLOR_FORMATS,
  NgxMatColorPickerModule
} from "@angular-material-components/color-picker";
import { DialogConfirmationComponent } from './Component/dialog-confirmation/dialog-confirmation.component';
import {IconPickerModule} from "ngx-icon-picker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { TotalsGraphComponent } from './Component/totals-graph/totals-graph.component';
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import {MatTabsModule} from "@angular/material/tabs";
import { HelpPageComponent } from './pages/help-page/help-page.component';
import { FavorisComponent } from './pages/favoris/favoris.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FullYearComponent,
    LoginComponent,
    MyCategoriesComponent,
    CategorieCardComponent,
    SousCategorieCardComponent,
    DialogCreateCategorieComponent,
    DialogCreateSousCategorieComponent,
    DialogConfirmationComponent,
    TotalsGraphComponent,
    HelpPageComponent,
    FavorisComponent,
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
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatColorPickerModule,
    IconPickerModule,
    MatRippleModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule
  ],
  providers: [
    AccountService,
    DatePipe,
    Location,
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
