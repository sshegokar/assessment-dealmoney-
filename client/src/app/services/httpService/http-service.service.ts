import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }
  uploadFile(data) {
    const httpOptions = {
    };
    return this.http.post(this.baseUrl + '/uploadFile', data, httpOptions);
  }

  exportFile(data) {
    const httpOptions = {
    };
    return this.http.put(this.baseUrl + 'users/resetPassword', data.body, httpOptions);
  }
}



