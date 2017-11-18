import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TipService } from './../../services/tip.service';
import { LoginService } from './../../services/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-tip',
    templateUrl: './tip.component.html',
    styleUrls: ['./tip.component.css']
})

export class TipComponent {

    private _tipForm: NgForm;
    public content: string;
    public loggedInUser;

    constructor(private _tipService: TipService, private _loginService: LoginService) {
        this._loginService.getLoggedInUser()
        .subscribe( user => {
            this.loggedInUser = user;
        });

    }

    public submitTip(formvalue: any) {
        const newTip = {
            date: new Date(),
            content: this.content
        };

        console.log(newTip);

        this._tipService.addTip(newTip)
        .subscribe(tip => {
            this.content = '';
        });


    }

    public submitTipIntoArray() {

        const newTip = {
            date: new Date(),
            content: this.content
        };

        this._tipService.pushTip(newTip, this.loggedInUser.uid)
        .subscribe( data => {
            console.log( 'We good?');
            this.content = '';
        });
    }
}
