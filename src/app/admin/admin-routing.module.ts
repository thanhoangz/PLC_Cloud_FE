import { NgModule } from '@angular/core';

import { AdminManagementComponent } from './admin-management/admin-management.component';
import { UserManagementComponent } from './content/user-management/user-management.component';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './content/course/course.component';
import { PaySlipTypesComponent } from './content/pay-slip-types/pay-slip-types.component';
import { ClassRoomComponent } from './content/class-room/class-room.component';
import { ReceiptTypesComponent } from './content/receipt-types/receipt-types.component';
import { PaySlipComponent } from './content/pay-slip/pay-slip.component';
import { TimeSheetComponent } from './content/time-sheet/time-sheet.component';
import { LanguageClassesComponent } from './content/language-classes/language-classes.component';
import { StudyProcessComponent } from './content/study-process/study-process.component';
import { AddPageLearnerComponent } from './content/learner/pages/add-page-learner/add-page-learner.component';
import { AddLearnerClassComponent  } from './content/add-learner-class/add-learner-class.component';
import { GuestTypeComponent } from './content/guest-type/guest-type.component';
import { HomeComponent } from './content/home/home.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminManagementComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'user', component: UserManagementComponent },
          { path: 'course', component: CourseComponent },
          { path: 'pay-slip-type', component: PaySlipTypesComponent },
          { path: 'pay-slip', component: PaySlipComponent },
          { path: 'classroom', component: ClassRoomComponent },
          { path: 'receipt-type', component: ReceiptTypesComponent },
          { path: 'time-sheet', component: TimeSheetComponent },
          { path: 'language-classes', component: LanguageClassesComponent },
          { path: 'add-learner-class', component: AddLearnerClassComponent },
          { path: 'study-process', component: StudyProcessComponent },
          { path: 'learner', component: AddPageLearnerComponent },
          { path: 'guest-type', component: GuestTypeComponent },
          { path: '', component: HomeComponent }
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
