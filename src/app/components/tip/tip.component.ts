import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TipService } from './../../services/tip.service';

@Component({
    selector: 'app-tip',
    templateUrl: './tip.component.html',
    styleUrls: ['./tip.component.css']
})

export class TipComponent {

    private _tipForm: NgForm;
    public content: string;

    constructor(private _tipService: TipService) {}

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
        this._tipService.pushTip()
        .subscribe( data => {
            console.log( 'We good?');
        });
    }
}
