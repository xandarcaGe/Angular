import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminRoutingModule } from '../admin-routing.module';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';  
import { BackButtonComponent } from '../../shared/back-button/back-button.component';

@Component({
  selector: 'app-admin-config',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressSpinnerModule,
    BackButtonComponent
  ],
  templateUrl: './admin-config.component.html',
  styleUrls: ['./admin-config.component.css'],
})
export class AdminConfigComponent implements OnInit {
  users: any[] = []; 
  employees:any[]=[]// Employees
  managers: any[] = []; // Managers
  isLoading: boolean = true;
  userDetails: any = null; // Store detailed user data for expansion
  isUserLoading: boolean = false; // Loading flag for user details

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
        // Filter users by their role
        this.employees = this.users.filter(user => user.role === 'employee');
        this.managers = this.users.filter(user => user.role === 'manager');
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      }
    );
  }

  // Fetch user details when expanding
  fetchUserDetails(userId: string): void {
    this.isUserLoading = true;
    this.userService.getUserDetails(userId).subscribe(
      (response) => {
        this.userDetails = response;
        this.isUserLoading = false;
      },
      (error) => {
        console.error('Error fetching user details:', error);
        this.isUserLoading = false;
      }
    );
  }

  goBack(): void {
    window.history.back();
  }
}
