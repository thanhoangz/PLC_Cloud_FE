import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseComponent } from './admin/content/category-management/courses/course/course.component';
import { LoginComponent } from './login/login.component';
import { AdminManagementComponent } from './admin/admin-management/admin-management.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    LoginComponent,
    AdminManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
