import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, Observable, tap } from 'rxjs';

import { IUser } from '../../interfaces/IUser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit {
  filterForm: FormGroup = new FormGroup({});
  searchUsers$: Observable<IUser[]> = new Observable<IUser[]>();

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      'email': new FormControl(this.route.snapshot.queryParamMap.get('email') ?? '', [Validators.email]),
      'status': new FormControl(this.route.snapshot.queryParamMap.get('status') == 'active')
    });
    this.searchUsers$ = this.userService.getSearchUsers(this.filterForm);

    const queryParameters = this.route.snapshot.queryParams;
    const email = queryParameters['email'] ? queryParameters['email'] : '';
    const status = queryParameters['status'] ? queryParameters['status'] : '';
    this.userService.users$ = concat(this.userService.getUsers(email, status), this.searchUsers$).pipe(
      tap(() => {
        this.router.navigate(
          ['/'],
          {
            queryParams: {
              email: this.filterForm.value.email ? this.filterForm.value.email : '',
              status: this.filterForm.value.status ? 'active' : 'inactive'
            },
            relativeTo: this.route
          }
        );
      })
    );
  }
}
