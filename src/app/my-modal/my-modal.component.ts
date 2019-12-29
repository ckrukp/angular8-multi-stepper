import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatStepper } from '@angular/material';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ModalData } from '../model-data';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.scss']
})

export class MyModalComponent implements OnInit {

  signUpFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  firthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;
  eighthFormGroup: FormGroup;
  ninethFormGroup: FormGroup;
  tenthFormGroup: FormGroup;
  elevenFormGroup: FormGroup;
  twelveFormGroup: FormGroup;
  thirteenFormGroup: FormGroup;
  fourteenFormGroup: FormGroup;
  
  currentStepRate = 0;
  currentJobKind = "part";
  isSignUpForm = true;
  lastStep = false;
  notPickDate = false;
  clientList = [""];
  certificationList = [""];
  collegeList = [""];
  datesSelected: NgbDateStruct[] = [];

  partTimeDateList = [];
  fullTimeDateList = [];
  
  constructor(
    public dialogRef: MatDialogRef<MyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
    ) { 
      dialogRef.disableClose = true;
    }

    onNoClick(): void {
      if (this.currentStepRate == 0) {
        this.dialogRef.close();
      } else {
        const dialogRef = this.dialog.open(ConfirmModalComponent, {
          width: '35%',
          height: '32%',
          data: { rate: this.currentStepRate }
        });
      }
    }

    change (value: NgbDateStruct[]) {
      this.datesSelected=value;
    }

    ngOnInit() {
      this.signUpFormGroup = this._formBuilder.group({});
      this.firstFormGroup = this._formBuilder.group({});
      this.secondFormGroup = this._formBuilder.group({});
      this.thirdFormGroup = this._formBuilder.group({});
      this.firthFormGroup = this._formBuilder.group({});
      this.fifthFormGroup = this._formBuilder.group({});
      this.sixthFormGroup = this._formBuilder.group({});
      this.seventhFormGroup = this._formBuilder.group({});
      this.eighthFormGroup = this._formBuilder.group({});
      this.ninethFormGroup = this._formBuilder.group({});
      this.tenthFormGroup = this._formBuilder.group({});
      this.elevenFormGroup = this._formBuilder.group({
        job_kind: ['part', Validators.required]
      });
      this.twelveFormGroup = this._formBuilder.group({});
      this.thirteenFormGroup = this._formBuilder.group({});
      this.fourteenFormGroup = this._formBuilder.group({});
    }

    changeJobKind(e) {
      this.currentJobKind = e.value;
    }

    goBack(stepper: MatStepper){
      if (stepper['_selectedIndex'] == 1) {
        this.isSignUpForm = true;
      }

      stepper.previous();
    }
  
    goForward(stepper: MatStepper) {
      if (stepper['_selectedIndex'] == 12) { // SELECTION JOB KIND
        if (this.datesSelected.length == 0) {
          this.notPickDate = true;
        } else {
          this.notPickDate = false;
          
          if (this.currentJobKind == 'part')
            this.getPartTimeJobDates();
          else
            this.getFullTimeJobDates();

          stepper.next();
        }
      } else {
        stepper.next();
      }
    }

    getPartTimeJobDates() {
      this.partTimeDateList = this.datesSelected;
      console.log("part time date list is ...", this.partTimeDateList);
    }
    
    getFullTimeJobDates() {
      let resultList = [];

      let selectedTimestampList = [];

      let currentDate = new Date();
      let date = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      let todayTimestamp = Date.parse(year + '-' + month + '-' + date);

      for (let i = 0; i < this.datesSelected.length; i ++) {
        let dateStr = this.datesSelected[i]["year"] + '-' + this.datesSelected[i]["month"] + '-' + this.datesSelected[i]["day"];

        selectedTimestampList.push(Date.parse(dateStr));
      }

      selectedTimestampList.sort();

      let maxTimestamp = selectedTimestampList[selectedTimestampList.length - 1];
      let monthLimit = new Date (new Date(maxTimestamp).getFullYear(), new Date(maxTimestamp).getMonth() + 1, 1).getTime();

      for (let i = todayTimestamp; i < monthLimit; i += 86400000) {
        let typedDate = {
          "year": new Date(i).getFullYear(),
          "month": new Date(i).getMonth() + 1,
          "day": new Date(i).getDate()
        };
        
        var findDate = this.datesSelected.find(function (el) {
          return el['year'] == typedDate['year'] && el['month'] == typedDate['month'] && el['day'] == typedDate['day'];
        });

        if (!findDate)
          resultList.push(typedDate);
      }

      this.fullTimeDateList = resultList;
      console.log("full time date list is ...", this.fullTimeDateList);
    }

    register(stepper: MatStepper) {
      this.isSignUpForm = false;
      stepper.next();
    }

    addClient() {
      this.clientList.push("");
    }

    addCert() {
      this.certificationList.push("");
    }

    addCollege() {
      this.collegeList.push("");
    }

    selectionChange(event) {
      this.currentStepRate = Math.round((event['selectedIndex'] / 15) * 1000) / 10;

      if (event['selectedIndex'] == 15) {
        this.lastStep = true;
      } else {
        this.lastStep = false;
      }
    }

}