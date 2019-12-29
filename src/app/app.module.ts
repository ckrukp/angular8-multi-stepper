import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { MyModalComponent } from './my-modal/my-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { RegisterComponent } from './register/register.component';
import {MultiDatePicker} from './multi-date-picker/multi-date-picker';
import { HomeComponent } from './home/home.component';
import { ProgressComponent } from './progress/progress.component';

import { InstagramService } from './service/instagram.service';
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    MyModalComponent,
    ConfirmModalComponent,
    MultiDatePicker,
    RegisterComponent,
    HomeComponent,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [InstagramService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [MyModalComponent, ConfirmModalComponent]
})

export class AppModule { }