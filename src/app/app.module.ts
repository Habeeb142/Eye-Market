import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyRouteComponent } from './my-route/my-route.component';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { PocComponent } from './poc/poc.component';
import { AmOnlineComponent } from './am-online/am-online.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CameraComponent } from './camera/camera.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavBarComponent,
    SideNavComponent,
    DashboardComponent,
    MyRouteComponent,
    DailyScheduleComponent,
    PocComponent,
    AmOnlineComponent,
    ResetPasswordComponent,
    CameraComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
