import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  constructor(public http: Http) { }

  getUserId(token) {
    return this.http.get('https://api.instagram.com/v1/users/self?access_token=' + token);
  }

  getPictures(userId, token) {
    return this.http.get('https://api.instagram.com/v1/users/' + userId + '/media/recent/?access_token=' + token);
  }
}
