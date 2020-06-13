import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appMaterial } from './appMaterial';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpServiceService } from './services/httpService/http-service.service';
import { UserServiceService } from './services/user-service.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DashboardComponent } from './component/dashboard/dashboard.component';




export function provideConfig() {
}
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // FormControl,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    appMaterial,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatDialogModule,
    ImageCropperModule,

  ],
  providers: [
    HttpServiceService,
    UserServiceService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
