import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardsService } from './core/auth-cookies/guards/guards.service';

const routes: Routes = [


  {
    path: 'dashboard',
    canActivate: [GuardsService],
    loadChildren: () =>
      import('./views/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./views/login/login.module')
        .then(m => m.LoginModule)
  },

  {
    path: 'contacts',
     loadChildren: () =>
     import('./views/contacts/contacts.module').then(m => m.ContactsModule)
    },

  {
    path: '',
    redirectTo: 'login/signIn',
    pathMatch: 'full'
  },








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
