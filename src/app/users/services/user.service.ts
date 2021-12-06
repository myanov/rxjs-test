import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users$: Observable<IUser[]> = new Observable<IUser[]>();

  constructor(
    private http: HttpClient
  ) { }

  getUsers(email = '', status = ''): Observable<IUser[]> {
    return this.http.get<{ meta: Record<string, unknown>, data: IUser[] }>(`${environment.apiUrl}users?email=${email}&status=${status}`).pipe(
      map(data => data.data)
    );
  }

  getSearchUsers(filterForm: FormGroup): Observable<IUser[]> {
    return filterForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(formValue => this.getUsers(formValue.email, formValue.status ? 'active' : 'inactive'))
    );
  }
}
