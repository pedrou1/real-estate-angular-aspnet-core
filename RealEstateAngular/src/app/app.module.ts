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
import {HttpClientModule} from '@angular/common/http';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './authentication/forms/register/register.component';
import { LoginComponent } from './authentication/forms/login/login.component';
import { ShowPropertyComponent } from './administrator-management/property-management/show-property/show-property.component';
import { AddEditPropertyComponent } from './administrator-management/property-management/add-edit-property/add-edit-property.component';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UserPropertyPublicComponent } from './user-property-public/user-property-public.component';
import { HomeComponent } from './user-property-public/home/home.component';
import { PropertyDetailComponent } from './user-property-public/property-detail/property-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './user-property-public/cart/cart.component';


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
    LoginComponent,
    ShowPropertyComponent,
    AddEditPropertyComponent,
    UserPropertyPublicComponent,
    HomeComponent,
    PropertyDetailComponent,
    NavbarComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCollapseModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
