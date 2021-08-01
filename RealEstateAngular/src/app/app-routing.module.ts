import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorManagementComponent } from './administrator-management/administrator-management.component';
import { LoginComponent } from './authentication/forms/login/login.component';
import { RegisterComponent } from './authentication/forms/register/register.component';
import { AuthGuard } from './authentication/guards/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutUsComponent } from './user-property-public/about-us/about-us.component';
import { ContactComponent } from './user-property-public/contact/contact.component';
import { HomeComponent } from './user-property-public/home/home.component';
import { PropertyDetailComponent } from './user-property-public/property-detail/property-detail.component';
import { UserProfileComponent } from './user-property-public/user-profile/user-profile.component';

const routes: Routes = [
  {path: '' , redirectTo: '/home', pathMatch: 'full'},
  {path: 'home' ,component:HomeComponent},
  {path: 'property-detail/:id' ,component:PropertyDetailComponent},
  { path: 'login', component: LoginComponent },
  {path:'register' ,component:RegisterComponent},
  {path: 'navbar' ,component:NavbarComponent},
  {path: 'administrator-management' ,component:AdministratorManagementComponent, canActivate : [AuthGuard]},
  {path: 'profile' ,component:UserProfileComponent},
  {path: 'about' ,component:AboutUsComponent},
  {path: 'contact' ,component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

