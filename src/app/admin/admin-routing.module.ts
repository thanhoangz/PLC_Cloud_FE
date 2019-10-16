import { NgModule } from '@angular/core';

import { AdminManagementComponent } from './admin-management/admin-management.component';
import { UserManagementComponent } from './content/user-management/user-management.component';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './content/course/course.component';
import { PaySlipTypesComponent } from './content/pay-slip-types/pay-slip-types.component';
import { ClassRoomComponent } from './content/class-room/class-room.component';
import { ReceiptTypesComponent } from './content/receipt-types/receipt-types.component';
import { PaySlipComponent } from './content/pay-slip/pay-slip.component';
<<<<<<< HEAD
import { LanguageClassesComponent} from './content/language-classes/language-classes.component';
import { StudyProcessComponent } from './content/study-process/study-process.component';
import { AddLearnerComponent} from './content/add-learner/add-learner.component';
=======
import { AddPageLearnerComponent } from './content/learner/pages/add-page-learner/add-page-learner.component';
>>>>>>> a251c291dfce2c71375d037753166507a42a2cd9

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
          { path: 'pay-slip-type', component: PaySlipTypesComponent },
          { path: 'pay-slip', component: PaySlipComponent },
          { path: 'classroom', component: ClassRoomComponent },
          { path: 'receipt-type', component: ReceiptTypesComponent },
<<<<<<< HEAD
          { path: 'language-classes', component: LanguageClassesComponent },
          { path: 'study-process', component: StudyProcessComponent },
          { path: 'add-learner', component: AddLearnerComponent },
=======
          { path: 'learner', component: AddPageLearnerComponent },

>>>>>>> a251c291dfce2c71375d037753166507a42a2cd9
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
