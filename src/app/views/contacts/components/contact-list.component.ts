import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact, ContactId } from 'src/app/models/contacts';

@Component({
  selector: 'af-contact-list',
  template: `
  <mat-form-field class="example-form-field cerca" appearance="outline">
  <input matInput type="search"  [(ngModel)]="searchText" placeholder="cerca" class="search-input">
  <button *ngIf="searchText" matSuffix mat-icon-button aria-label="Clear" (click)="searchText=''">
    <mat-icon>close</mat-icon>
  </button>
</mat-form-field>



  <div class="card-title">
    <h3>Contatti</h3>
  </div>



  <div class="card-content"
    *ngFor="let contact of contacts | filter : searchText"
    [ngClass]="{'fa-card': contact._id === selectedContact?._id}"
    (click)="selectedContact = contact">

    <div class="icon-card">
      <mat-icon>account_circle</mat-icon>
    </div>

    <div class="card-info-container">

      <div class="card-number">
        <span>{{contact.name}} {{contact.surname}}</span>
      </div>

      <div class="card-info">
        <span class="iban"><b>{{contact.iban}}</b></span>
      </div>

    </div>


    <div class="btn-check">
      <mat-icon matTooltip="Seleziona"
      (click)="selectedContactsId.emit({selectedContactId: contact})"
      >
        done
      </mat-icon>
    </div>


    <div class="btn-edit">
      <mat-icon matTooltip="Modifica"
      (click)="editContactsId.emit({selectedContactId: contact})"
      >
        edit
      </mat-icon>


    <div class="btn-delete">
      <mat-icon matTooltip="Rimuovi"
      (click)="removeContactsId.emit({selectedContactId: contact})"
      >
        delete
      </mat-icon>
    </div>
  </div>


</div>

  `,
  styles: [`

  .container{
  display: flex;
  margin: 20px;
  flex-direction: column;
  border-radius: 10px;
  justify-content: center;


}

.btn{
  width: 100%;
}



.card-content{
  display: flex;
  width: 100%;
  margin-bottom: 15px;
}

.icon-card{
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.card-info-container{
  display: flex;
  flex-direction: column;
  width: 100%;
}

.card-info{
  display: flex;
}

.type{
  margin-left: 5px;
}


.btn-delete, .btn-edit{
  margin-left: 10px;
}


.fa-card{
  background-color: lightblue;
  border-radius: 10px;
}



.btn-delete, .btn-check, .btn-edit{
  display: flex;
  justify-content: center;
  align-items: center;
}


.newContact{
  width: 100%;
}

.cerca{
  width: 100%;
}

  `
  ]
})
export class ContactListComponent implements OnInit {

  @Input() contacts: Contact[] = []

  @Output() selectedContactsId = new EventEmitter<ContactId>();
  @Output() editContactsId = new EventEmitter<ContactId>();
  @Output() removeContactsId = new EventEmitter<ContactId>();


  searchText = '';


  selectedContact: Contact | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
