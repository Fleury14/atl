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

    ngOnInit() {
        this._loginService.getLoggedInUser()
            .subscribe( user => {
                this.loggedInUser = user;
                console.log(this.loggedInUser);
            });

    }

    public login() {
        this._loginService.login();
    }

    public logout() {
        this._loginService.logout();
    }

    constructor( private _loginService: LoginService ) {}
}
