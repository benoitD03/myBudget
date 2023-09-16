import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LastMonthComponent} from "./pages/last-month/last-month.component";
import {FullYearComponent} from "./pages/full-year/full-year.component";
import {Config} from "./class/config";
import {LoginComponent} from "./pages/login/login.component";
import {MyCategoriesComponent} from "./pages/my-categories/my-categories.component";

const routes: Routes = [
  { path: Config.ROUTE_LOGIN, component: LoginComponent },
  { path: Config.ROUTE_DASHBOARD, component: DashboardComponent },
  { path: Config.ROUTE_LAST_MONTH, component: LastMonthComponent },
  { path: Config.ROUTE_FULL_YEAR, component: FullYearComponent },
  { path: Config.ROUTE_MY_CATEGORIES, component: MyCategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
