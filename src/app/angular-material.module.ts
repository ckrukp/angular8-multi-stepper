import { NgModule } from '@angular/core';
import {
    MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatStepperModule, MatIconModule, MatProgressBarModule, MatSelectModule, MatRadioModule, MatCheckboxModule,MatDatepickerModule, MatNativeDateModule
} from '@angular/material';


@NgModule({
    imports: [MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatStepperModule, MatIconModule, MatProgressBarModule, MatSelectModule , MatRadioModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule],
    exports: [MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatStepperModule, MatIconModule, MatProgressBarModule, MatSelectModule , MatRadioModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule]
})

export class AngularMaterialModule { }