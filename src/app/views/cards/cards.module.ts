import { MaterialModule } from './../../shared/material/material.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './cards.component';
import { CardListComponent } from './components/card-list.component';
import { CardFormComponent } from './components/card-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CardsComponent,
    CardListComponent,
    CardFormComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ]
})
export class CardsModule { }
