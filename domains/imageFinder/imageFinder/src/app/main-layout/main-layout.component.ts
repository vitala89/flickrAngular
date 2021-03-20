import {Component, HostListener, OnInit} from '@angular/core';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  userActivity: any;
  userInactive: Subject<any> = new Subject();
  socialUser: SocialUser;
  isLoggedin: boolean = false;
  constructor(private socialAuthService: SocialAuthService) {
    this.setTimeout();
    this.userInactive.subscribe(() => alert('User inactive one minute'));
  }

  ngOnInit() {
  }
  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(this.isLoggedin = false), 60000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

}
