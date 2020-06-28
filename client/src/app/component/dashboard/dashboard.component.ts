import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UserServiceService } from 'src/app/services/user-service.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})



export class DashboardComponent implements OnInit {
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private userService: UserServiceService) { }
  route: any;
  details: {};
  fileToUpload: File = null;

  ngOnInit() {
  }

handleFileInput(event: any) {
    this.fileToUpload = event.item(0);
    if (!this.fileToUpload) {
      this.snackBar.open('File is required', 'End Now', { duration: 3000 });
      return;
    }
    if (!this.isFileTypeValid(this.fileToUpload)) {
        this.snackBar.open('Invalid file type', 'End Now', { duration: 3000 });
        return;
      }
  }

isFileTypeValid(fileData: any) {
    if (fileData.name.split('.')[1].toLowerCase() === 'json') {
      return true;
    }
    return false;
  }
onUpload() {
    if (this.fileToUpload) {
      const reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload); // read file as data url
      reader.onload = (event) => {
        console.log(event);// called once readAsDataURL is completed
        this.userService.uploadFile(this.fileToUpload).toPromise()
          .then(() => {
            this.snackBar.open('File Uploaded Successfully', 'End Now', { duration: 3000 });
          })
          .catch((error: any) => {
            this.snackBar.open(error.error.message, 'End Now', { duration: 3000 });
          });
    };
  // tslint:disable-next-line:align
  } else {
    this.snackBar.open('Invalid File', 'End Now', { duration: 3000 });
  }
}
exportFile() {
  this.userService.exportFile({}).toPromise()
  .then((response: any) => {
    saveAs(new Blob([response]), 'file-data.xlsx');
  });
}

}
