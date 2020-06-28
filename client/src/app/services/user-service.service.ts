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

  uploadFile(files: File) {
    const formData = new FormData();
    formData.append('fileKey', files, files.name);
    return this.httpService.uploadFile(files);
  }
}

