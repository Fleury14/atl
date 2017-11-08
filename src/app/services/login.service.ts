import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()

export class LoginService {

    // declare logged in user as observable
    private _loggedInUser: Observable<firebase.User>;


    // greab the logged in user as an observable from the fire auth service
    constructor( private _authService: AngularFireAuth ) {
        this._loggedInUser = _authService.authState;

    }

    public login(): Promise<any> {
        console.log('Logging in via google popup...');
        return this._authService.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
    }

    public logout(): Promise<any> {
        return this._authService.auth.signOut();
    }

    public getLoggedInUser(): Observable<firebase.User> {
        return this._loggedInUser;
    }
}
