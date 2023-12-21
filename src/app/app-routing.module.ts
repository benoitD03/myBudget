import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LastMonthComponent} from "./pages/last-month/last-month.component";
import {FullYearComponent} from "./pages/full-year/full-year.component";
import {Config} from "./class/config";
import {LoginComponent} from "./pages/login/login.component";
import {MyCategoriesComponent} from "./pages/my-categories/my-categories.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: Config.ROUTE_LOGIN, component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: Config.ROUTE_DASHBOARD, component: DashboardComponent, canActivate: [AuthGuard] },
  { path: Config.ROUTE_FULL_YEAR, component: FullYearComponent, canActivate: [AuthGuard] },
  { path: Config.ROUTE_MY_CATEGORIES, component: MyCategoriesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
