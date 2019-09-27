import { AdminRoutingModule } from './admin-routing.module';
import { UserManagementComponent } from './content/user-management/user-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { CourseComponent } from './content/course/course.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  declarations: [
    AdminManagementComponent,
    UserManagementComponent,
    CourseComponent
  ]
})
export class AdminModule { }
