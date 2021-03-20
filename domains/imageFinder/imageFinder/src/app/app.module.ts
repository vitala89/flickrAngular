import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ImageListComponent } from './image-list/image-list.component';
import {MenubarModule} from "primeng/menubar";
import {SharedModule} from "primeng/api";
import {AvatarModule} from "primeng/avatar";
import {CardModule} from "primeng/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ChipsModule} from "primeng/chips";
import {PaginatorModule} from "primeng/paginator";
import {DataViewModule} from "primeng/dataview";
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BadgeModule} from "primeng/badge";
import { FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {RippleModule} from "primeng/ripple";
@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ImageListComponent,
    BookmarksComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    SharedModule,
    AvatarModule,
    CardModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChipsModule,
    PaginatorModule,
    DataViewModule,
    ToastModule,
    BrowserAnimationsModule,
    BadgeModule,
    SocialLoginModule,
    RippleModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '274554990533251'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
