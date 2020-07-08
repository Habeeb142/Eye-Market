import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MyRouteComponent } from './my-route/my-route.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { PocComponent } from './poc/poc.component';

import { AuthGuardService as AuthGuard } from './service/auth-guard.service';
import { CameraComponent } from './camera/camera.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'MyRoute', component: MyRouteComponent, canActivate: [AuthGuard] },
  { path: 'DailySchedule', component: DailyScheduleComponent, canActivate: [AuthGuard] },
  { path: 'poc/:pocId', component: PocComponent, canActivate: [AuthGuard] },
  { path: 'camera', component: CameraComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
