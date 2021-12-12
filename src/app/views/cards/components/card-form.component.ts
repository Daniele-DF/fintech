import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { TypeCard } from 'src/app/models/card';
import { CardForm } from 'src/app/models/cardForm';

@Component({
  selector: 'af-card-form',
  template: `
 <mat-card class="container">

<!-- form -->

<form #f="ngForm" (ngSubmit)="save(f)">


  <div class="input-content">

    <h3>Aggiungi Carta</h3>

    <!-- Tipo di carta -->
    <mat-form-field appearance="fill">
      <mat-label>Tipo di carta</mat-label>
      <mat-select [ngModel] name="type" required>
        <mat-option *ngFor="let typeC of typeCard" value="{{typeC.label}}">{{typeC.label}}</mat-option>
      </mat-select>
    </mat-form-field>

    <div class="user-info">
      <!-- name -->
      <mat-form-field appearance="fill" class="inputName">
        <mat-label>Nome</mat-label>
        <input matInput [ngModel] class="form-control" name="name" required />
      </mat-form-field>

      <!-- username -->
      <mat-form-field appearance="fill" class="inputSurname">
        <mat-label>Cognome</mat-label>
        <input matInput [ngModel] name="surname" required />
      </mat-form-field>
    </div>


    <!-- card info -->

    <mat-form-field appearance="fill" class="cardNumber">
      <mat-label>Nr. Carta</mat-label>
      <input matInput [ngModel] name="number" required minlength="16" maxlength="16" />
    </mat-form-field>

    <mat-form-field #mario appearance="fill" class="securityCardNumber">
      <mat-label>Codice di sicurezza</mat-label>
      <input matInput [ngModel] name="csc" required minlength="3" maxlength="3" />
    </mat-form-field>




    <!-- btn -->
    <div class="btn">
      <button mat-raised-button color="primary"  [disabled]="f.invalid">Aggiungi carta</button>
      <div class="btn-warn">
        <button (click)="drawer?.close()" mat-stroked-button color="warn" (click)="canceled.emit()">Annulla</button>
      </div>
    </div>
  </div>
</form>
</mat-card>

  `,
  styles: [`
  .container{
  display: flex;
  margin: 20px;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 10px;

}

.input-content{
  display: flex;
  flex-direction: column;
}

.user-info input{
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.btn{
  display: flex;
  flex-direction: column;
}

.btn-warn{
  display: flex;
  flex-direction: column;
  margin-top: 10px ;
}


.inputName {
  width: 50%;

}



.inputSurname {
  width: 49%;
  margin-left: 4px;
}

  `
  ]
})
export class CardFormComponent implements OnInit {



  @Input() drawer: MatDrawer | undefined;


  @Output() addCard = new EventEmitter<CardForm>();

  @Output() canceled = new EventEmitter<void>();


  @ViewChild('f', {read: NgForm}) form !: NgForm;


  typeCard : TypeCard[]  = [
    {label: 'visa', value: 'visa'},
    {label: 'mastercard' , value: 'mastercard'}
  ];

  constructor(public breakpointObserver: BreakpointObserver) { }



  ngOnInit(): void {

  }



  save(f: NgForm){
    if(f.valid){
    this.addCard.emit(f.value);
    this.cleanUp();
    }

  }

  cleanUp(){
    console.log('reset');
    this.form.resetForm()
  }


}


