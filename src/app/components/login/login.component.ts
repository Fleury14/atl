import { Component, OnInit } from '@angular/core';

import { LoginService } from './../../services/login.service';
import { TipService } from './../../services/tip.service';

import 'rxjs/add/operator/map';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    public loggedInUser;
    public currentDate: Date;
    public tips = [];
    public userIdResult;
    public viewPassResult;
    public idChecker = 'testuser';

    // ngModels for password entry
    public pass1: string;
    public pass2: string;
    private _passwordError = false;

    // by using oninit, we call the loggedinuser method as soon as the page loads. we dont map the user object right now
    // but in the future, this would be a good idea. we then subscribe to it so that the loggedinuser updates after
    // user changes.
    ngOnInit() {
        this._loginService.getLoggedInUser()
            .subscribe( user => {
                this.loggedInUser = user;
                console.log(this.loggedInUser);
                if (this.loggedInUser) {
                    this.dataCheck(this.loggedInUser.uid);
                }

            });


        this.currentDate = new Date();


    }

    // calls the login and logout methods of the login service
    public login() {
        this._loginService.login();
    }

    public logout() {
        if (confirm('Do you really wanna leave?')) {
            this._loginService.logout();
        }

    }

    public dataCheck(uid) {

        if (!uid) {
            console.log('No userID passed to datachecker, aborting.');
            return;
        }
        this.userIdCheck(uid);
        if (this.userIdResult === true ) {
            this.viewPassCheck(uid);
        } else {
            this.viewPassResult = false;
        }

    }

    public userIdCheck(id) {
        this._tipService.checkUser(id)
        .subscribe(result => {
            console.log('result', result);
            this.userIdResult = result;
        });

    }

    public viewPassCheck(id) {
        this._tipService.checkViewPass(id)
        .subscribe(result => {
            this.viewPassResult = result;
        });
    }

    public submitNewUser() {
        if (this.pass1 === '' || (!this.pass1)) {
            this._passwordError = true;
            return;
        }

        const newUser = {
            name: this.loggedInUser.displayName,
            id: this.loggedInUser.uid,
            viewpass: this.pass1,
            tips: []
        };

        console.log(newUser);

    }

    // inject the login service into this component as well as the tip service
    constructor( private _loginService: LoginService, private _tipService: TipService ) {

        // call the getTasks function in the tip service to get all the tips from the database, and then suscribe to it in order
        // to assign it to the variable tips
        this._tipService.getTasks()
            .subscribe(tips => {
                console.log(tips);
                this.tips = tips;
            });
    }
}
