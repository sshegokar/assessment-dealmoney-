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
    return this.http.post('http://localhost:3000/uploadFile', data, httpOptions);
  }

  exportFile(data) {
    const httpOptions = {
    };
    return this.http.get('http://localhost:3000/exportFile', httpOptions);
  }
}



