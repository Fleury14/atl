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
        if (confirm('Do you really wanna leave?')) {
            this._loginService.logout();
        }

    }

    public userIdCheck() {
        const result = this._tipService.checkUser('testuser');
        console.log('result', result);
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
