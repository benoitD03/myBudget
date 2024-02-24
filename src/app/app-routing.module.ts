import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {FullYearComponent} from "./pages/full-year/full-year.component";
import {Config} from "./class/config";
import {LoginComponent} from "./pages/login/login.component";
import {MyCategoriesComponent} from "./pages/my-categories/my-categories.component";
import {AuthGuard} from "./guards/auth.guard";
import {HelpPageComponent} from "./pages/help-page/help-page.component";
import {FavorisComponent} from "./pages/favoris/favoris.component";

const routes: Routes = [
  { path: Config.ROUTE_LOGIN, component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: Config.ROUTE_DASHBOARD, component: DashboardComponent, canActivate: [AuthGuard] },
  { path: Config.ROUTE_FULL_YEAR, component: FullYearComponent, canActivate: [AuthGuard] },
  { path: Config.ROUTE_MY_CATEGORIES, component: MyCategoriesComponent, canActivate: [AuthGuard] },
  { path: Config.ROUTE_FAVORIS, component: FavorisComponent, canActivate: [AuthGuard]},
  { path: Config.ROUTE_HELP, component: HelpPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
