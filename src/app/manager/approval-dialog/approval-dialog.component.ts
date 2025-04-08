import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-approval-dialog',
  templateUrl: './approval-dialog.component.html',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  styleUrls: ['./approval-dialog.component.css']
})
export class ApprovalDialogComponent {
  approvalNote: string = '';

  constructor(
    public dialogRef: MatDialogRef<ApprovalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { requestId: number }
  ) {}

  submitApproval() {
    this.dialogRef.close(this.approvalNote); // Send note back to parent
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
