import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorManagementComponent } from './administrator-management/administrator-management.component';

const routes: Routes = [
  {path: 'administrator-management' ,component:AdministratorManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
