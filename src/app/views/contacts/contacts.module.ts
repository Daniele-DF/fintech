import { MaterialModule } from './../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactListComponent } from './components/contact-list.component';
import { ContactFormComponent } from './components/contact-form.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../utils/filter.pipe';


@NgModule({
  declarations: [
    ContactsComponent,
    ContactListComponent,
    ContactFormComponent,
    FilterPipe

  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ContactsModule { }
