import { EditLanguageClassComponent } from './content/language-classes/dialog/edit-language-class/edit-language-class.component';
import { LanguageClassesComponent } from './content/language-classes/language-classes.component';
import { EditPaysliptypeDialogComponent } from './content/pay-slip-types/dialog/edit-paysliptype-dialog/edit-paysliptype-dialog.component';
import { AddReceiptTypeComponent } from './content/receipt-types/dialog/add-receipt-type/add-receipt-type.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserManagementComponent } from './content/user-management/user-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseComponent } from './content/course/course.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AddCourseDialogComponent } from './content/course/dialog/add-course-dialog/add-course-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditCourseDialogComponent } from './content/course/dialog/edit-course-dialog/edit-course-dialog.component';
import { DeleteCourseDialogComponent } from './content/course/dialog/delete-course-dialog/delete-course-dialog.component';
import { DetailCourseDialogComponent } from './content/course/dialog/detail-course-dialog/detail-course-dialog.component';
import { BidiModule } from '@angular/cdk/bidi';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ConfirmDialogComponent } from './extension-dialog/confirm-dialog/confirm-dialog.component';
import { PaySlipTypesComponent } from './content/pay-slip-types/pay-slip-types.component';
import { ClassRoomComponent } from './content/class-room/class-room.component';
import { ReceiptTypesComponent } from './content/receipt-types/receipt-types.component';
import { EditReceiptTypeComponent } from './content/receipt-types/dialog/edit-receipt-type/edit-receipt-type.component';
import { AddClassRoomComponent } from './content/class-room/dialog/add-class-room/add-class-room.component';
import { EditClassRoomComponent } from './content/class-room/dialog/edit-class-room/edit-class-room.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddPaysliptypeDialogComponent } from './content/pay-slip-types/dialog/add-paysliptype-dialog/add-paysliptype-dialog.component';
import { PaySlipComponent } from './content/pay-slip/pay-slip.component';
import { AddPayslipDialogComponent } from './content/pay-slip/dialog/add-payslip-dialog/add-payslip-dialog.component';
import { EditPayslipDialogComponent } from './content/pay-slip/dialog/edit-payslip-dialog/edit-payslip-dialog.component';
import { DetailPayslipDialogComponent } from './content/pay-slip/dialog/detail-payslip-dialog/detail-payslip-dialog.component';
import { AddLanguageClassComponent } from './content/language-classes/dialog/add-language-class/add-language-class.component';
import { DetailLanguageClassComponent } from './content/language-classes/dialog/detail-language-class/detail-language-class.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonToggleModule,
    MatBadgeModule,
    FormsModule,
    MatDialogModule,
    MatPaginatorModule,
    BidiModule,
    TextFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule

  ],
  declarations: [
    UserManagementComponent,
    CourseComponent,
    AdminManagementComponent,
    EditCourseDialogComponent,
    DeleteCourseDialogComponent,
    DetailCourseDialogComponent,
    AddCourseDialogComponent,
    ConfirmDialogComponent,
    PaySlipTypesComponent,
    ClassRoomComponent,
    ReceiptTypesComponent,
    AddReceiptTypeComponent,
    EditReceiptTypeComponent,
    AddClassRoomComponent,
    EditClassRoomComponent,
    EditPaysliptypeDialogComponent,
    AddPaysliptypeDialogComponent,
    PaySlipComponent,
    AddPayslipDialogComponent,
    EditPayslipDialogComponent,
    DetailPayslipDialogComponent,
    LanguageClassesComponent,
    AddLanguageClassComponent,
    EditLanguageClassComponent,
    DetailLanguageClassComponent
  ]
})
export class AdminModule { }
