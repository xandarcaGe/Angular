import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-notification',
  standalone:true,
  imports:[NavbarComponent,CommonModule,MatCardModule,MatListModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.fetchNotifications();
  }

  fetchNotifications(): void {
    this.notificationService.getEmailNotifications().subscribe(
      (response) => {
        this.notifications = response.notifications;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }
}
