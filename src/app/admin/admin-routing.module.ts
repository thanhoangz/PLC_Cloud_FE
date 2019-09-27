import { NgModule } from '@angular/core';

import { AdminManagementComponent } from './admin-management/admin-management.component';
import { UserManagementComponent } from './content/user-management/user-management.component';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './content/course/course.component';


const adminRoutes: Routes = [
  {
    path: '',
    component: AdminManagementComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'user', component: UserManagementComponent },
          { path: 'course', component: CourseComponent },
          { path: '', component: CourseComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
