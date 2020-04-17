import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  FB: any;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    (window as any).fbAsyncInit = function() {
      this.FB.init({
        appId: '249341116219840',
        cookie: true,
        xfbml: true,
        version: 'v6.1'
      });
      this.FB.AppEvents.logPageView();
    };
    (function(d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  submitLogin() {
    console.log('submit login to facebook');
    // FB.login();
    this.FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        // login success
        // login success code here
        // redirect to home page
      } else {
        console.log('User login failed');
      }
    });
  }
}


