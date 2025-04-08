import { Component,OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule,CommonModule,MatSidenavModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  role: string | null = null;
  router: any;
  notificationPath: string = '/';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  closeSidenav() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    this.setNotificationPath(); // Assuming your AuthService has a method to get the role
  }
  constructor(
    private authService: AuthService,
    private router1: Router  // ✅ Ensure Router is properly injected
  ) {}

  setNotificationPath(): void {
    if (this.role === 'admin') {
      this.notificationPath = '/admin/notifications';
    } else if (this.role === 'employee') {
      this.notificationPath = '/employee/notifications';
    } else {
      this.notificationPath = '/'; // Default route
    }
  }


  logout() {
    this.authService.logout();
    this.router1.navigate(['/login']);  // ✅ Redirect to login after logout
  }

  
}
