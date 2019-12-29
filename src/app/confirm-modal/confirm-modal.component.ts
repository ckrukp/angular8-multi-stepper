import { Component, OnInit, Inject, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import {MyModalComponent} from '../my-modal/my-modal.component';
import { ModalData } from '../model-data';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})

export class ConfirmModalComponent implements OnInit {
  currentStepRate = 0;
  @Output() cancelProcess: EventEmitter<null> = new EventEmitter();

  constructor(
      public dialogRef: MatDialogRef<ConfirmModalComponent>,
      public dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: ModalData
    ) { 
      dialogRef.disableClose = true;
      this.currentStepRate = this.data['rate'];
    }

    onContinueClick(): void {
      this.dialogRef.close();
    }

    onCancelClick(): void {
      this.dialog.closeAll();
    }

    ngOnInit() {
    }

}