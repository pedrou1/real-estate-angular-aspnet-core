import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdministratorManagementComponent } from './administrator-management/administrator-management.component';
import { UserManagementComponent } from './administrator-management/user-management/user-management.component';
import { ShowUserComponent } from './administrator-management/user-management/show-user/show-user.component';
import { AddEditUserComponent } from './administrator-management/user-management/add-edit-user/add-edit-user.component';
import { PropertyManagementComponent } from './administrator-management/property-management/property-management.component';
import { SharedService } from './shared.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './authentication/forms/register/register.component';
import { LoginComponent } from './authentication/forms/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AdministratorManagementComponent,
    UserManagementComponent,
    ShowUserComponent,
    AddEditUserComponent,
    PropertyManagementComponent,
    AuthenticationComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
