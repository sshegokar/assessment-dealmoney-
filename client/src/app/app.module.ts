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
import { WelcomeComponent } from './component/welcome/welcome.component';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { AddUserComponent } from './component/add-user/add-user.component';

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('2203659926599837')
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AddUserComponent,


  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
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
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    HttpServiceService,
    UserServiceService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
