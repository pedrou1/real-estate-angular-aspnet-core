import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorManagementComponent } from './administrator-management/administrator-management.component';
import { PropertyManagementComponent } from './administrator-management/property-management/property-management.component';

const routes: Routes = [
  {path: 'administrator-management' ,component:AdministratorManagementComponent},
  {path:'property' ,component:PropertyManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
