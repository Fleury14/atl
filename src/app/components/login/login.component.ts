import { Component, OnInit } from '@angular/core';

import { LoginService } from './../../services/login.service';

import 'rxjs/add/operator/map';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    public loggedInUser;
    public currentDate: Date;

    // by using oninit, we call the loggedinuser method as soon as the page loads. we dont map the user object right now
    // but in the future, this would be a good idea. we then subscribe to it so that the loggedinuser updates after
    // user changes.
    ngOnInit() {
        this._loginService.getLoggedInUser()
            .subscribe( user => {
                this.loggedInUser = user;
                console.log(this.loggedInUser);
            });

        this.currentDate = new Date();

    }

    // calls the login and logout methods of the login service
    public login() {
        this._loginService.login();
    }

    public logout() {
        this._loginService.logout();
    }

    // inject the login service into this component
    constructor( private _loginService: LoginService ) {}
}
