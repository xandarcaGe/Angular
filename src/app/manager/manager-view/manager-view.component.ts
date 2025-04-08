import { Component, input, Input} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RequestService,RequestData } from '../../services/request.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ApprovalDialogComponent } from '../approval-dialog/approval-dialog.component';

@Component({
  selector: 'app-manager-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatIconModule],
  providers: [DatePipe], 
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css'],
  
})
export class ManagerViewComponent {
  @Input() requestDetails!: RequestData;
  @Input() requestId!:number;
  constructor(private requestService: RequestService,private snackBar: MatSnackBar, private dialog:MatDialog) {}

  approveRequest() {
    const dialogRef = this.dialog.open(ApprovalDialogComponent,{
      width: '400px',
      data:{ requestId:this.requestDetails.id}
    });
    dialogRef.afterClosed().subscribe((approvalNote) => {
      if (approvalNote) {
        this.requestService.approveRequestWithNote(this.requestDetails.id, approvalNote).subscribe({
          next: () => {
            this.showNotification('✅ Request Approved with Note!', 'success-snackbar');
          },
          error: () => {
            this.showNotification('❌ Failed to Approve Request', 'error-snackbar');
          }
        });
      }
    });
  }

  rejectRequest() {
    this.requestService.updateRequeststatus(this.requestDetails.id, 'rejected').subscribe({
      next: () => {
        this.showNotification('❌ Request Rejected!', 'error-snackbar');
      },
      error: () => {
        this.showNotification('❌ Failed to Reject Request', 'error-snackbar');
      }
    });
  }

  private updateStatus(status: string, message: string) {
    this.requestService.updateRequeststatus(this.requestDetails.id, status).subscribe({
      next: (response) => {
        console.log(response);
        this.showNotification(message, 'success-snackbar');
      },
      error: (error) => {
        console.error('Error updating request:', error);
        this.showNotification('Failed to update request ❗', 'error-snackbar');
      }
    });
  }

  private showNotification(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 seconds
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass]
    });
  }
  
}
