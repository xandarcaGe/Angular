import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminConfigComponent } from './admin-config/admin-config.component';
import { AdminNewUserComponent } from './admin-newuser/admin-newuser.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { AdminEmailComponent } from './email/email.component';

const routes: Routes = [
  {path:'home',component:AdminHomeComponent},
  {path:'config',component:AdminConfigComponent},
  {path:'add-user',component:AdminNewUserComponent},
  {path: 'request-detail/:id', component:RequestDetailComponent},
  {path:'email',component:AdminEmailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
