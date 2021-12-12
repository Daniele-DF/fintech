import { MaterialModule } from './../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApointmentsRoutingModule } from './apointments-routing.module';
import { ApointmentsComponent } from './apointments.component';
import { DaySlotListComponent } from './components/day-slot-list.component';
import { DaySlotsComponent } from './components/day-slots.component';
import { LocationListComponent } from './components/location-list.component';
import { MapsComponent } from './components/maps.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ApointmentsComponent,
    DaySlotListComponent,
    DaySlotsComponent,
    LocationListComponent,
    MapsComponent

  ],
  imports: [
    CommonModule,
    ApointmentsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ApointmentsModule { }
