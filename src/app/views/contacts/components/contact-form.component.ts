import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/models/contacts';

@Component({
  selector: 'af-contact-form',
  template: `
 <mat-card class="container">

<!-- form -->

<form #f="ngForm" (ngSubmit)="save(f)">

   <div class="input-field">



      <!-- name -->
      <mat-form-field appearance="fill" class="inputName">
        <mat-label>Nome</mat-label>
        <input matInput  [ngModel]="initialContact?.name" class="form-control" name="name" required />
      </mat-form-field>

      <!-- username -->
      <mat-form-field appearance="fill" class="inputSurname">
        <mat-label>Cognome</mat-label>
        <input matInput  [ngModel]="initialContact?.surname" name="surname" required />
      </mat-form-field>




    <!-- card info -->

    <mat-form-field appearance="fill" class="iban">
      <mat-label>IBAN</mat-label>
      <input matInput  [ngModel]="initialContact?.iban" name="iban" required minlength="16" maxlength="16" />
    </mat-form-field>





<!-- (click)="addCard.emit(f.value)" lo avevo messo qui sotto nel bottone Aggiungi carta
 ma ai fini dell 'esercizio va messo nel metodo save , (ovvero nel ngSubmit)'
 per controllare anche se il form è valido

-->

    <!-- btn -->

       <button mat-raised-button color="primary"   [disabled]="f.invalid">Salva</button>

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
export class ContactFormComponent implements OnInit {

  @Input() initialContact : Contact | null = null;

  @Input() readOnly : boolean | null =  null;

  @Output() saveContact = new EventEmitter<Partial<Contact>>();

  constructor() { }

  ngOnInit(): void {
  }

  save(form: NgForm){
    console.log('contactForm', form.value);
    if(form.valid){
      //emit
    this.saveContact.emit(form.value);
    }
  }

}
