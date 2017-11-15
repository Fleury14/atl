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

    // this is the method to call the back end api and get all the tips from the database, and .map it to a json
    getTasks() {
        return this.http.get('http://localhost:3000/api/tips')
            .map(res => res.json());
    }

    public checkUser(id) {
        return this.http.get('http://locaslhost:3000/api/contain/' + id)
            .map(res => {
                console.log('response', res);
                res.json();
            });
    }

    // this calls the api to add a new tip to the database that is sent in
    public addTip(newTip: ITip) {
        // create a new set of headers and add the content type
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        // return the post request mapped to a json
        return this.http.post('http://localhost:3000/api/tip', JSON.stringify(newTip), {headers: headers})
            .map(res => res.json);
    }

    // this method deletes the tip given the correct id
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
