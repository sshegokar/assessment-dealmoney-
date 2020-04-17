import { Injectable } from '@angular/core';
import { HttpServiceService } from './httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private httpService: HttpServiceService) { }
  register(obj) {
    const userId = obj;
    return this.httpService.getUserInfo(userId);
  }
  addUser(obj) {
    const data = {
      data: obj
    };
    return this.httpService.getUserInfo(data);
  }
}

