import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Auth,
  authState,
  getAuth,
  getIdToken,
  getIdTokenResult,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserRoles } from '../models/user-roles';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public authState$;
  public user: User;
  public jwtToken: string;
  public isLoggedIn: boolean;
  public isLoggedOut: boolean;
  public pictureUrl?: string;
  public roles: UserRoles;

  constructor(private router: Router, private auth: Auth) {
    this.authState$ = authState(auth);
    this.authState$.subscribe((user) => {
      this.user = user as User;
      getIdTokenResult(this.user) // this.auth.idTokenResult
        .then((token) => {
          this.roles = (token?.claims as unknown as UserRoles) ?? {
            admin: false,
          };
          this.jwtToken = token.token;
        });
      this.isLoggedIn = !!user;
      this.isLoggedOut = !this.isLoggedIn;
      this.pictureUrl = user ? user.photoURL || undefined : undefined;
      router.navigateByUrl('home');
    });
  }

  logout() {
    this.auth.signOut();
    this.router.navigateByUrl('/home');
  }
}
