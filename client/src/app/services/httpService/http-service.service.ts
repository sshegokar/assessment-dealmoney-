import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {


  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getUserInfo(userId) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('access_token')
      })
    };
    return this.http.post(this.baseUrl + 'users/getUserInfo' + userId, httpOptions);
  }
  addUser(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('access_token')
      })
    };
    return this.http.post(this.baseUrl + 'users/addUser', data.body, httpOptions);
  }

}



