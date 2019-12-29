import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  constructor(public dialog: MatDialog, private router: Router) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '70%',
      height: '80%'
    });

    // dialogRef.afterClosed().subscribe(res => {
      
    // });
  }

  signUp(): void {
    this.router.navigate(['/progress']);
  }
}

