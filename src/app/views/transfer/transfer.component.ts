import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardsService } from 'src/app/api/cards.service';
import { ContactsService } from 'src/app/api/contacts.service';
import { Card } from 'src/app/models/card';
import { Contact } from 'src/app/models/contacts';
import { ContactsComponent } from '../contacts/contacts.component';

@Component({
  selector: 'af-transfer',
  template: `
    <mat-card class="container">

<!-- form -->

<form #f="ngForm" (ngSubmit)="save(f)">

   <div class="input-field">

    <button mat-raised-button type="button" (click)="openDialog()" >Lista contatti</button>

      <!-- name -->
      <mat-form-field appearance="fill" class="inputName">
        <mat-label>Nome</mat-label>
        <input matInput [ngModel]="this.selectedContact?.name" class="form-control" name="name" required />
      </mat-form-field>

      <!-- username -->
      <mat-form-field appearance="fill" class="inputSurname">
        <mat-label>Cognome</mat-label>
        <input matInput [ngModel]="this.selectedContact?.surname" class="form-control" name="surname" required />
      </mat-form-field>




    <!-- card info -->

    <mat-form-field appearance="fill" class="iban">
      <mat-label>IBAN</mat-label>
      <input matInput class="form-control"[ngModel]="this.selectedContact?.iban" name="iban" required minlength="16" maxlength="16" />
    </mat-form-field>

    <mat-form-field  appearance="fill" class="import">
      <mat-label>Importo</mat-label>
      <input matInput  name="import"  class="form-control" required />
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Seleziona una carta</mat-label>
      <mat-select matInput name="card" card="card" [ngModel] #card="ngModel" class="form-control" >
        <mat-option (click)="selectCardId = card.number" *ngFor="let card of cards"  [value]="card._id">{{card.number}}</mat-option>
      </mat-select>
    </mat-form-field>



<!-- (click)="addCard.emit(f.value)" lo avevo messo qui sotto nel bottone Aggiungi carta
 ma ai fini dell 'esercizio va messo nel metodo save , (ovvero nel ngSubmit)'
 per controllare anche se il form è valido

-->

    <!-- btn -->

       <button mat-raised-button color="primary"   [disabled]="f.invalid">Trasferisci denaro</button>

      </div>
</form>
</mat-card>

  `,
  styles: [`


.container{
  display: flex;
  flex-direction: column;
}

.input-field{
  display: flex;
  flex-direction: column;
}


.inputName{
  margin-top : 8px;
}


  `
  ]
})
export class TransferComponent implements OnInit {


  @ViewChild('f', {static: false}) f!: NgForm ;



  cards: Card[] = [];

  selectCardId : string =  '';

  visible: boolean = false;




  contacts : Contact [] = [];

  selectedContact: Contact | undefined;





  constructor(public snackBar: MatSnackBar, public Dialog: MatDialog, private cardService: CardsService, private contactsService : ContactsService) {
    this.cardService.getAllCards().subscribe(res => {
      console.log('res',res);
      this.cards = res
  })
}

  ngOnInit(): void {
    this.contactsService.getAllContacts().subscribe(data =>{
      this.contacts = data;
    })

  }




  save(form: NgForm){
    if(!form.invalid){
    console.log(form.value);
    this.snackBar.open('Transfer Completed', 'SUCCESS');
    }

  }


openDialog(){
  this.visible = true;
  const dialogRef = this.Dialog.open(ContactsComponent,{
    height: '400px',
    width: '550px',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result ${result}`);
    if(result){
      this.selectedContact = this.contacts.find(c => c._id === result);
      if(this.selectedContact){
        this.f.control.patchValue({name: this.selectedContact.name});
        this.f.control.patchValue({surname: this.selectedContact.surname});
        this.f.control.patchValue({iban: this.selectedContact.iban});
      }

     // this.f.control.value({result});
    }
  })
}

}
