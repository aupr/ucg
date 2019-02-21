import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-generate-dialog',
  templateUrl: './generate-dialog.component.html',
  styleUrls: ['./generate-dialog.component.scss']
})
export class GenerateDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GenerateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
