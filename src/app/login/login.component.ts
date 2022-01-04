import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import * as firebaseui from 'firebaseui';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  Auth,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  ui: firebaseui.auth.AuthUI;
  constructor(private router: Router, private auth: Auth) {}

  ngOnInit() {
    this.auth.onAuthStateChanged((app) => {
      const uiConfig: firebaseui.auth.Config = {
        signInOptions: [
          EmailAuthProvider.PROVIDER_ID,
          GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
           signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this),
        },
      };

      this.ui = new firebaseui.auth.AuthUI(this.auth);

      this.ui.start('#firebaseui-auth-container', uiConfig);

      this.ui.disableAutoSignIn();
    });
  }

  ngOnDestroy() {
    this.ui.delete();
  }

  onLoginSuccessful(result: any): boolean {
    console.log('Firebase UI result:', result);

    this.router.navigateByUrl('/courses');
    return true;
  }
}
