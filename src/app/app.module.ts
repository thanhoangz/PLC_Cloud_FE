import { EditClassRoomComponent } from './admin/content/class-room/dialog/edit-class-room/edit-class-room.component';
import { EditReceiptTypeComponent } from './admin/content/receipt-types/dialog/edit-receipt-type/edit-receipt-type.component';
import { OnlyNumberDirective } from './admin/services/only-number.directive';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AddCourseDialogComponent } from './admin/content/course/dialog/add-course-dialog/add-course-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
import { BidiModule } from '@angular/cdk/bidi';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditCourseDialogComponent } from './admin/content/course/dialog/edit-course-dialog/edit-course-dialog.component';
import { DetailCourseDialogComponent } from './admin/content/course/dialog/detail-course-dialog/detail-course-dialog.component';
import { DatePipe, CurrencyPipe, CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { ConfirmDialogComponent } from './admin/extension-dialog/confirm-dialog/confirm-dialog.component';
import { AddReceiptTypeComponent } from './admin/content/receipt-types/dialog/add-receipt-type/add-receipt-type.component';
import { AddClassRoomComponent } from './admin/content/class-room/dialog/add-class-room/add-class-room.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OnlyNumberDirective,
  ],
  imports: [
    AdminModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
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
    BidiModule,


  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    DatePipe
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    AddCourseDialogComponent,
    EditCourseDialogComponent,
    DetailCourseDialogComponent,
    ConfirmDialogComponent,
    AddReceiptTypeComponent,
    EditReceiptTypeComponent,
    AddClassRoomComponent,
    EditClassRoomComponent
  ]

})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
