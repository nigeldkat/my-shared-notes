import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { SharedModule } from '../shared/shared.module';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AngularFireAuthModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent, SignupComponent
  ],
  exports:[]
})
export class AuthModule { }
