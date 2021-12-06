import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserFilterComponent } from './components/user-filter/user-filter.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
    UserListComponent,
    UserFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
