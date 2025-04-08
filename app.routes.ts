import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { RequestDetailComponent } from './employee/request-detail/request-detail.component';
import { NewRequestComponent } from './employee/new-request/new-request.component';
import { UpdateRequestComponent } from './employee/update-request/update-request.component';
import { NotificationComponent } from './employee/notification/notification.component';
import { ManagerHomeComponent } from './manager/manager-home/manager-home.component';
import { ManagerViewComponent } from './manager/manager-view/manager-view.component';
import { ManagerEmailComponent } from './manager/manager-email/manager-email.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    { 
        path: 'admin', 
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
      },
      { 
        path: 'employee/home', 
        component: EmployeeHomeComponent // ✅ Directly reference the standalone component
      },
      {
        path:'employee/detail/:id',
        component: RequestDetailComponent
      },
      {
        path:'employee/new-request',
        component:NewRequestComponent
      },
      {
        path:'employee/update-request/:id',
        component:UpdateRequestComponent
      },
      {
        path:'employee/notifications',
        component:NotificationComponent
      },
      {
        path:'manager/home',
        component:ManagerHomeComponent
      },
      {
        path:'manager/view/:id',
        component:ManagerViewComponent
      },
      {
        path:'manager/email',
        component:ManagerEmailComponent
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login by default
      { path: '**', redirectTo: 'login' } // Wildcard route to handle unknown paths
];
