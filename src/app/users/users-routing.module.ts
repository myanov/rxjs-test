import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './components/user-list/user-list.component';

const usersRoutes: Routes = [
  {
    path: '',
    component: UserListComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
