import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-tip',
    templateUrl: './tip.component.html',
    styleUrls: ['./tip.component.css']
})

export class TipComponent {

    private _tipForm: NgForm;

    public submitTip(formvalue: any) {
        const thisTip = {
            date: new Date(),
            content: formvalue
        };

        console.log(thisTip);
    }
}
