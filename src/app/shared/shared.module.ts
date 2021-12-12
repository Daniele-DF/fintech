import { MovementsModule } from './../views/movements/movements.module';
import { MovementsComponent } from './../views/movements/movements.component';
import { TransferComponent } from './../views/transfer/transfer.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { LoginModule } from '../views/login/login.module';
import { CardsModule } from '../views/cards/cards.module';
import { TransferModule } from '../views/transfer/transfer.module';
import { CardsComponent } from '../views/cards/cards.component';
import { GuardsService } from '../core/auth-cookies/guards/guards.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    LoginModule,
    CardsModule,
    FormsModule,
    TransferModule,
    MovementsModule,
    RouterModule.forChild([
      {
      path: '',
      component: DashboardComponent,
      canActivate: [GuardsService],
      children: [

        {
          path: 'home',
          loadChildren: () =>
           import('../views/home/home.module').then(m => m.HomeModule)
        },


        {
          path: 'cards',
          component: CardsComponent

        },

        {
          path: 'transfer',
          component: TransferComponent

        },
        {
          path: 'movements',
          component: MovementsComponent
        },
        { path: 'appointments',
         loadChildren: () => import
         ('../views/apointments/apointments.module').then(m => m.ApointmentsModule)
        },
        {
          path: 'taxes',
          loadChildren: () =>
          import('../views/taxes/taxes.module').then(m => m.TaxesModule)
        },
      ]

      }
    ])
  ],
  exports: [DashboardComponent]
})
export class SharedModule { }
