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
import { AddPageLectureComponent } from './content/lecturers/page/add-page-lecture/add-page-lecture.component';
import { AddPersonnelComponent } from './content/personnel/page/add-personnel/add-personnel.component';
import { ControlsPersonnelComponent } from './content/personnel/page/controls-personnel/controls-personnel.component';
import { LecturersComponent } from './content/lecturers/lecturers.component';
import { EditPageLectureComponent } from './content/lecturers/page/edit-page-lecture/edit-page-lecture.component';
import { PersonnelComponent } from './content/personnel/personnel.component';
import { ClassComponent } from './content/class/class.component';
import { CommonPointComponent } from './content/common-point/common-point.component';
import { SearchStudyprocessComponent } from './content/search-studyprocess/search-studyprocess.component';
import { ScheduleForLearnerComponent } from './content/schedule-school/schedule-for-learner/schedule-for-learner.component';
import { ScheduleInTableComponent } from './content/schedule-school/schedule-in-table/schedule-in-table.component';

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
          { path: 'add-learner', component: AddPageLearnerComponent },
          { path: 'guest-type', component: GuestTypeComponent },
          { path: 'personnels', component: PersonnelComponent },
          { path: 'add-personnel', component: AddPersonnelComponent },
          { path: 'control-personnel', component: ControlsPersonnelComponent },
          { path: 'addlecturer', component: AddPageLectureComponent },
          { path: 'editlecturer', component: EditPageLectureComponent },
          { path: 'lecturer', component: LecturersComponent },
          { path: 'class-list', component: ClassComponent },
          { path: 'commin-point', component: CommonPointComponent },
          { path: 'schedule', component: ScheduleForLearnerComponent },
          { path: 'schedule-table', component: ScheduleInTableComponent },

          { path: 'search-learner', component: SearchStudyprocessComponent },
          { path: '', component: HomeComponent },
          { path: 'home', component: HomeComponent }
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
