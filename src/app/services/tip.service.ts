import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import ITip from './../interfaces/tip.interface';

@Injectable()

export class TipService {

    // initialize http module in constructor and let user know in console that its up and running
    constructor( private http: Http ) {
        console.log('Tip service initialized...');
    }

    getTasks() {
        return this.http.get('http://localhost:3000/api/tips')
            .map(res => res.json());
    }

    public addTip(newTip) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/api/tip', JSON.stringify(newTip), {headers: headers})
            .map(res => res.json);
    }

    deleteTip(id) {
        return this.http.delete('http://localhost:3000/api/tip/' + id)
            .map(res => res.json());
    }

    public servUpdateStatus(tip) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:3000/api/tip/' + tip._id, JSON.stringify(tip), {headers: headers})
            .map(res => res.json);
    }
}
