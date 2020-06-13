import { Injectable } from '@angular/core';
import { HttpServiceService } from './httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private httpService: HttpServiceService) { }

  exportFile({}) {
    const obj = {};
    return this.httpService.exportFile(obj);
  }

  uploadFile(files: any) {
    const formData = new FormData();
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < files.length; index++) {
      formData.append(files[index].title, files[index], files[index].filename);
    }
    return this.httpService.uploadFile(formData);
  }
}

