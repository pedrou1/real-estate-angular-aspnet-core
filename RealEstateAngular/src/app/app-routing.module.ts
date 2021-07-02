import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorManagementComponent } from './administrator-management/administrator-management.component';
import { PropertyManagementComponent } from './administrator-management/property-management/property-management.component';
import { UserManagementComponent } from './administrator-management/user-management/user-management.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/forms/login/login.component';
import { RegisterComponent } from './authentication/forms/register/register.component';
import { AuthGuard } from './authentication/guards/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './user-property-public/home/home.component';
import { PropertyDetailComponent } from './user-property-public/property-detail/property-detail.component';

const routes: Routes = [
  {path: '' , redirectTo: '/home', pathMatch: 'full'},
  {path: 'home' ,component:HomeComponent},
  {path: 'property-detail/:id' ,component:PropertyDetailComponent},
  { path: 'login', component: LoginComponent },
  {path:'register' ,component:RegisterComponent},
  {path:'auth' ,component:AuthenticationComponent},
  {path: 'navbar' ,component:NavbarComponent},
  {path: 'administrator-management' ,component:AdministratorManagementComponent, canActivate : [AuthGuard]},
  {path:'property' ,component:PropertyManagementComponent, canActivate : [AuthGuard]},
  {path:'user' ,component:UserManagementComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
/*
  path: 'administrator-management', component: AdministratorManagementComponent,
    children: [
      {
        path: 'property',
        outlet: 'aboutOne',
        component: PropertyManagementComponent,
        canActivate : [AuthGuard]
      }
  ]},
  */
