import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class LoginService {
    private user: Observable<firebase.User>;
    constructor(private http: Http,
        private _firebaseAuth: AngularFireAuth) {
            this.user = _firebaseAuth.authState;
         }

    login(username: string, password: string): Observable<boolean> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const url = '/api/authenticate';
        const options = new RequestOptions({ headers: headers });
        return this.http.post(url, JSON.stringify({ username: username, password: password }), options)
            .map((response: Response) => {
                const token = response.json() && response.json().token;
                if (token) {
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    return true;
                } else {
                    return false;
                }
            });
    }

    signInWithTwitter(){
        return this._firebaseAuth.auth.signInWithPopup(
            new firebase.auth.TwitterAuthProvider()
        )
    }
}
