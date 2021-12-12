import { MaterialModule } from './../../shared/material/material.module';
import { RouterModule } from '@angular/router';
import { NgModule, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SigInComponent } from './components/sig-in.component';
import { RegisterComponent } from './components/register.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    SigInComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild([
    {
      path: 'login',
      children: [
        {
          path: 'signIn',
          component: LoginComponent
        },
        {
          path: 'register',
          component: LoginComponent
        },
        {
          path: '',
          redirectTo: 'signIn',
          pathMatch: 'full'

        }
      ]
    }

    ])
  ]
})
export class LoginModule { }
