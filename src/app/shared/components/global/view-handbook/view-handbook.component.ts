import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-handbook',
  imports: [],
  templateUrl: './view-handbook.component.html',
  styleUrl: './view-handbook.component.scss',
})
export class ViewHandbookComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewHandbookComponent>
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
