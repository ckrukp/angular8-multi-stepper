import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { InstagramService } from '../service/instagram.service';

import { Instagram } from "ng2-cordova-oauth/core";
import { OauthBrowser } from 'ng2-cordova-oauth/platform/browser';

import * as jQuery from 'jquery';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
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
  // currentJobKind = "part";
  isSignUpForm = true;
  lastStep = false;
  notPickDate = false;
  instagramConnected = false;
  instaPics = [];
  displayPics = [];
  datesSelected: NgbDateStruct[] = [];

  partTimeDateList = [];
  // fullTimeDateList = [];

  private oauth: OauthBrowser = new OauthBrowser();
  private instagramProvider: Instagram = new Instagram({
    clientId: "f194c426811749f38002d5f19512aa2f",
    redirectUri: 'http://localhost',
    responseType: 'token',
    appScope: ['basic', 'public_content']
  });

  constructor(private _formBuilder: FormBuilder, private instaService: InstagramService) { }

  ngOnInit() {
    this.signUpFormGroup = this._formBuilder.group({});
    this.firstFormGroup = this._formBuilder.group({});
    this.secondFormGroup = this._formBuilder.group({});
    this.thirdFormGroup = this._formBuilder.group({});
    this.firthFormGroup = this._formBuilder.group({});
    this.fifthFormGroup = this._formBuilder.group({
      clients: this._formBuilder.array([this.createClientArray()])
    });
    this.sixthFormGroup = this._formBuilder.group({});
    this.seventhFormGroup = this._formBuilder.group({
      certificationList: this._formBuilder.array([this.createCertificationArray()])
    });
    this.eighthFormGroup = this._formBuilder.group({
      educationList: this._formBuilder.array([this.createEducationArray()])
    });
    this.ninethFormGroup = this._formBuilder.group({});
    this.tenthFormGroup = this._formBuilder.group({});
    this.elevenFormGroup = this._formBuilder.group({
      job_kind: ['part', Validators.required]
    });
    this.twelveFormGroup = this._formBuilder.group({});
    this.thirteenFormGroup = this._formBuilder.group({});
    this.fourteenFormGroup = this._formBuilder.group({});
  }

  createClientArray() {
    return this._formBuilder.group({
      email: null
    });
  }

  createCertificationArray() {
    return this._formBuilder.group({
      cert: null
    });
  }

  createEducationArray() {
    return this._formBuilder.group({
      edu: null
    });
  }

  instagramConnecting() {
    this.oauth.logInVia(this.instagramProvider)
      .then((success) => {

        this.instaService.getUserId(success['access_token']).subscribe((res) => {

          this.instaService.getPictures(res['data']['id'], success['access_token'])
            .subscribe((insta) => {
              this.instagramConnected = true;
              this.instaPics = insta['data'];

              if (this.instaPics.length <= 4)
                this.displayPics = this.instaPics
              else {
                for (let i = 0; i < 4; i++) {
                  this.displayPics.push(this.instaPics[i]);
                }
              }
              console.log("Instagram Media data like this: >>>>>>>>>>>>>>>>>", this.instaPics);
            });

        }, (error) => {
          console.log('ERROR: ' + error);
        });

      }).catch((err) => {
        console.log('erro: >>>>' + err);
      });
  }

  getClient(form): Array<any> {
    return form.controls.clients.controls;
  }

  getCertification(form): Array<any> {
    return form.controls.certificationList.controls;
  }

  getEducation(form): Array<any> {
    return form.controls.educationList.controls;
  }

  change(value: NgbDateStruct[]) {
    this.datesSelected = value;
  }

  goBack(stepper: MatStepper) {
    if (stepper['_selectedIndex'] == 1) {
      this.isSignUpForm = true;
    }
    stepper.previous();
  }

  register(stepper: MatStepper) {
    this.isSignUpForm = false;
    stepper.next();
  }

  goForward(stepper: MatStepper) {
    if (stepper['_selectedIndex'] == 12) { // SELECTION JOB KIND
      if (this.datesSelected.length == 0) {
        this.notPickDate = true;
      } else {
        this.notPickDate = false;
        this.getJobTimeRange();

        stepper.next();
      }
    } else {
      stepper.next();
    }
  }

  getJobTimeRange() {
    let output = {};

    this.datesSelected.forEach((row) => {
      let year = row['year'];
      let month = row['month'];
      let day = row['day'];
    
      if (!output[year])
        output[year] = {};
        if (!output[year][month])
          output[year][month] = {};

      output[year][month][day] = true;
      
    });

    console.log("part time date list is ...", output);
  }

  addClient() {
    const control = <FormArray>this.fifthFormGroup.get('clients');
    control.push(this.createClientArray());

    console.log("client is added >>>>>>>>>>>", this.fifthFormGroup.value);
  }

  addCert() {
    const control = <FormArray>this.seventhFormGroup.get('certificationList');
    control.push(this.createCertificationArray());

    console.log("certification is added >>>>>>>>>>>", this.seventhFormGroup.value);
  }

  addCollege() {
    const control = <FormArray>this.eighthFormGroup.get('educationList');
    control.push(this.createEducationArray());

    console.log("education is added >>>>>>>>>>>", this.eighthFormGroup.value);
  }

  selectionChange(event) {
    this.currentStepRate = Math.round((event['selectedIndex'] / 15) * 1000) / 10;

    if (event['selectedIndex'] == 15) {
      this.lastStep = true;
    } else {
      this.lastStep = false;
    }
  }

  selectAll() {
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let todayTimestamp = Date.parse(year + '-' + month + '-' + date);

    let selectedMonth, selectedYear;

    var selectionEls = jQuery(".custom-select");

    for (var i = 0; i < selectionEls.length; i++) {
      if (selectionEls[i].title == "Select month")
        selectedMonth = parseInt(selectionEls[i].value);
      else if (selectionEls[i].title == "Select year")
        selectedYear = parseInt(selectionEls[i].value);
    }

    let startDate = new Date(selectedYear, selectedMonth - 1, 1).getTime();
    let monthLimit = new Date(selectedYear, selectedMonth, 1).getTime();

    if (year == selectedYear && month == selectedMonth)
      startDate = todayTimestamp;

    for (let i = startDate; i < monthLimit; i += 86400000) {
      let typedDate = {
        "year": new Date(i).getFullYear(),
        "month": new Date(i).getMonth() + 1,
        "day": new Date(i).getDate()
      };
      let index = this.datesSelected.findIndex(f => f.day == typedDate.day && f.month == typedDate.month && f.year == typedDate.year);

      if (index < 0)
        this.datesSelected.push(typedDate);
    }
  }

  deselect() {
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let todayTimestamp = Date.parse(year + '-' + month + '-' + date);

    let selectedMonth, selectedYear;

    var selectionEls = jQuery(".custom-select");

    for (var i = 0; i < selectionEls.length; i++) {
      if (selectionEls[i].title == "Select month")
        selectedMonth = parseInt(selectionEls[i].value);
      else if (selectionEls[i].title == "Select year")
        selectedYear = parseInt(selectionEls[i].value);
    }

    let startDate = new Date(selectedYear, selectedMonth - 1, 1).getTime();
    let monthLimit = new Date(selectedYear, selectedMonth, 1).getTime();

    if (year == selectedYear && month == selectedMonth)
      startDate = todayTimestamp;

    for (let i = startDate; i < monthLimit; i += 86400000) {
      let typedDate = {
        "year": new Date(i).getFullYear(),
        "month": new Date(i).getMonth() + 1,
        "day": new Date(i).getDate()
      };
      this.datesSelected = this.datesSelected.filter(function(el) {
        return el.day != typedDate.day || el.month != typedDate.month || el.year != typedDate.year
      });
    }
  }
}
