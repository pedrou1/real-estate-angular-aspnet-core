import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorManagementComponent } from './administrator-management/administrator-management.component';
import { PropertyManagementComponent } from './administrator-management/property-management/property-management.component';
import { UserManagementComponent } from './administrator-management/user-management/user-management.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/forms/login/login.component';
import { RegisterComponent } from './authentication/forms/register/register.component';

const routes: Routes = [
  {path: 'administrator-management' ,component:AdministratorManagementComponent},
  {path:'property' ,component:PropertyManagementComponent},
  {path:'user' ,component:UserManagementComponent},
  { path: 'login', component: LoginComponent },
  {path:'register' ,component:RegisterComponent},
  {path:'auth' ,component:AuthenticationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
